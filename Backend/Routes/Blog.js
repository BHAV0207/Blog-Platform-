require("dotenv").config();
const authenticate = require("../Middleware/jwtMiddleware");
const express = require("express");
const router = express.Router();
const BlogPost = require("../Models/posts");
const User = require("../Models/user");
const rateLimit = require("express-rate-limit");

const postLimiter = rateLimit({
  windowMs : 15 *60 *1000,
  max : 15,
  message : "Too many requests, please try again later"
})

router.get("/", async (req, res) => {
  try {
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

    res.json({
      totalRecords,
      totalPages,
      currentPage: page,
      pageSize: limit,
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.get("/:userId", async (req, res) => {
  try {
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

    res.json({
      totalRecords,
      totalPages,
      currentPage: page,
      pageSize: limit,
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.post("/create",postLimiter,  async (req, res) => {
  try {
    const { title, content, userId, imageUrls } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const newPost = await BlogPost.create({
      title,
      content,
      userId,
      imageUrls,
    });

    res
      .status(201)
      .json({ message: "Blog post created successfully.", blogPost: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to create the blog Post", err });
  }
});


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


router.put("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, imageUrls } = req.body;

    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = title;
    post.content = content;
    post.imageUrls = imageUrls;
    await post.save();

    res.json({ message: "Post updated successfully", post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


router.delete("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const post = await BlogPost.findByPk(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await post.destroy();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
