const express = require("express");
const router = express.Router();
const BlogPost = require("../Models/posts");
const User = require("../Models/user");
const rateLimit = require("express-rate-limit");
const Comment = require("../Models/comments");

const commentPostLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later",
});

router.get("/postId", async (req, res) => {
  let { postId } = req.params;
  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: BlogPost, attributes: ["id", "title"] },
      ],
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

router.post("/:postId", commentPostLimiter, async (req, res) => {
  const { postId } = req.params;
  const { userId, comment } = req.body;
  
})