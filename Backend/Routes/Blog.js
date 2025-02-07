require("dotenv").config();
const authenticate = require("../Middleware/jwtMiddleware");
const express = require("express");
const router = express.Router();
const BlogPost = require("../Models/posts");
const User = require("../Models/user");
const rateLimit = require("express-rate-limit");
const multer = require("multer");
const path = require("path");
const redis = require("../utils/redisclient");

// RATE LIMITER
const postLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: "Too many requests, please try again later",
});

// MULTER CONFIGURATION
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // Ensure this path exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 }, // Limit file size to 10MB
});

// REDIS CLIENT
function getCacheKey(key, value) {
  {
    return value ? "blog:" + key + ":" + value : "blog:" + key;
  }
}


// GET ALL BLOG POSTS
router.get("/", async (req, res) => {
  try {
    const cacheKey = "posts:all";
    const cachedPosts = await redis.get(cacheKey);
    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts));
    }

    let { page, limit } = req.query;
    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;

    const posts = await BlogPost.findAndCountAll({
      include: [{ model: User, attributes: ["id", "name", "email"] }],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const totalRecords = posts.count;
    const post = posts.rows;
    const totalPages = Math.ceil(totalRecords / limit);

    const responseData = {
      totalRecords,
      totalPages,
      currentPage: page,
      pageSize: limit,
      post,
    };

    await redis.set(
      cacheKey,
      JSON.stringify({
        responseData,
      }),
      "EX",
      300
    );

    res.json({
      responseData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// GET ALL BLOG POSTS BY USER
router.get("/:userId", async (req, res) => {
  try {

    const cacheKey = getCacheKey("posts", req.params.userId);
    const cachedPosts = await redis.get(cacheKey);
    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts));
    }

    let { page, limit } = req.query;
    let { userId } = req.params;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;

    const offset = (page - 1) * limit;

    const posts = await BlogPost.findAndCountAll({
      where: { userId },
      include: [{ model: User, attributes: ["id", "name", "email"] }],
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    const totalRecords = posts.count;
    const post = posts.rows;
    const totalPages = Math.ceil(totalRecords / limit);

    const responseData = {
      totalRecords,
      totalPages,
      currentPage: page,
      pageSize: limit,
      post,
    };

    await redis.set(
      cacheKey,
      JSON.stringify({
        responseData,
      }),
      "EX",
      300
    );

    res.json({
      responseData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// CREATE A BLOG POST IMAGE UPLOAD IS OPTIONAL
router.post(
  "/create",
  postLimiter,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { title, content, userId } = req.body;

      if (!title || !content || !userId) {
        return res.status(400).json({ message: "Please enter all fields" });
      }

      const existingUser = await User.findByPk(userId);
      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }
      const imageUrls =
        req.files && req.files.length > 0
          ? req.files.map((file) => `/uploads/${file.filename}`)
          : [];

      const newPost = await BlogPost.create({
        title,
        content,
        userId,
        imageUrls,
      });

      await redis.del("posts:all");
      await redis.del(getCacheKey("posts", userId));

      res.status(201).json({
        message: "Blog post created successfully.",
        blogPost: newPost,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Failed to create the blog post", err });
    }
  }
);

// CREATE A BLOG POST WITH IMAGE UPLOAD
router.post("upload/:id", upload.array("images", 5), async (req, res) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    // Ensure images were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images uploaded." });
    }

    // Append new images to existing ones
    const existingImages = post.imageUrls || [];
    const newImages = req.files.map((file) => `/uploads/${file.filename}`);

    post.imageUrls = [...existingImages, ...newImages];
    await post.save();

    res.status(200).json({
      message: "Images uploaded successfully.",
      updatedPost: post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to upload images", err });
  }
});

// GET A BLOG POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id, {
      indclude: [{ model: User, attribures: ["id", "name", "email"] }],
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE A BLOG POST
router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title;
    post.content = content;
    await post.save();

    await redis.del("posts:all");
    await redis.del(getCacheKey("posts", post.userId));

    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE A BLOG POST
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();

    await redis.del("posts:all");
    await redis.del(getCacheKey("posts", post.userId));
    
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
