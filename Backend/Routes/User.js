const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticate = require("../Middleware/jwtMiddleware");
require("dotenv").config();
const redis = require("../utils/redisclient");


//GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const cacheKey = "users:all";
    const cachedUsers = await redis.get(cacheKey);
    if (cachedUsers) {
      return res.json(JSON.parse(cachedUsers));
    }

    const users = await User.findAll();

    await redis.set(cacheKey, JSON.stringify(users), "EX", 300);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});


// DELETE A USER
router.delete("/:userId", authenticate, async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();

    await redis.del("users:all");
    res.json({ message: "User deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
