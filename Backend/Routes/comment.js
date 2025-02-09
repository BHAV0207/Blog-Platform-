const express = require("express");
const router = express.Router();
const BlogPost = require("../Models/posts");
const User = require("../Models/user");
const rateLimit = require("express-rate-limit");
const Comment = require("../Models/comments");
const redis = require("../utils/redisclient");

const commentPostLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 50,
  message: "Too many requests, please try again later",
});


// GET ALL COMMENTS ON A POST
router.get("/:postId", async (req, res) => {
  let { postId } = req.params;
  try {
    const postExists = await BlogPost.findByPk(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const cacheKey = `comments:${postId}`;
    const cachedComments = await redis.get(cacheKey);
    if (cachedComments) {
      return res.json(JSON.parse(cachedComments));
    }

    const comments = await Comment.findAll({
      where: { postId },
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: BlogPost, attributes: ["id", "title"] },
      ],
    });
    await redis.set(cacheKey, JSON.stringify(comments), "EX", 300);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// POST A COMMENT ON A POST
router.post("/:postId", commentPostLimiter, async (req, res) => {
  const { postId } = req.params;
  const { content , userId } = req.body;
  try {
    if (!content || !userId) {
      return res.status(400).json({ message: "Content and userId are required" });
    }

    const postExists = await BlogPost.findByPk(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const comment = await Comment.create({
      postId,
      content,
      userId,
      include: [
        { model: User, attributes: ["id", "name"] },
        { model: BlogPost, attributes: ["id", "title"] },
      ],
    });


    await redis.del(`comments:${userId}`);
    await redis.del(`comments:${postId}`);
    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// GET ALL COMMNETS OF A USER
router.get("/user/:userId" , async (req, res) => {
  let {userId} = req.params;

  try{

    const cacheKey = `comments:${userId}`;
    const cachedComments = await redis.get(cacheKey);
    if(cachedComments){
      return res.json(JSON.parse(cachedComments));
    }
    const userExists = await User.findByPk(userId);
    if(!userExists){
      return res.status(404).json({message: "User not found"});
    }
    const comments = await Comment.findAll({
      where : {userId},
      include: [
        { model: BlogPost, attributes: ["id", "title"] },
      ]
    })

    await redis.set(cacheKey , JSON.stringify(comments) , "EX" , 300);
    res.json(comments);
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Server Error"});
  }
})


// DELETE A COMMENT
router.delete("/:commentId", async (req, res) => {
  const { commentId } = req.params;
  try {
    const comment = await Comment.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    await comment.destroy();

    await redis.del(`comments:${comment.userId}`);
    await redis.del(`comments:${comment.postId}`);
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

    await redis.del(`comments:${comment.userId}`);
    await redis.del(`comments:${comment.postId}`);
    res.json({ message: "Comment updated successfully", comment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
