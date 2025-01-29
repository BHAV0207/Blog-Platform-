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


// GET ALL COMMENTS ON A POST
router.get("/:postId", async (req, res) => {
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

// POST A COMMENT ON A POST
router.post("/:postId", commentPostLimiter, async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.create({
      postId,
      content,
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: BlogPost, attributes: ["id", "title"] },
      ],
    });
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// DELETE A COMMENT
router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comment.destroy();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

// UPDATE A COMMENT
router.put("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    comment.content = content;
    await comment.save();
    res.json({ message: "Comment updated successfully", comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
})

module.exports = router;
