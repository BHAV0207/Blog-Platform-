require("dotenv").config();
const authenticate = require("../Middleware/jwtMiddleware");
const express = require("express");
const router = express.Router();
const BlogPost = require("../Models/posts");
const User = require("../Models/user");

router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: [{ model: User, attributes: ["id", "name", "email"] }],
    });

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/create", async (req, res) => {
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
    res.status(500).json({ message: "failed to create the blog Post" , err });
  }
});



module.exports = router;
