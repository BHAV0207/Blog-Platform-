const express = require("express");
const sequelize = require("./Models/db");
const User = require("./Models/user");
const BlogPost = require("./Models/posts");
const Comment = require("./Models/comments");
const path = require("path");

const app = express();
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const AuthRoute = require("./Routes/Auth");
app.use("/api/auth", AuthRoute);

const UserRoute = require("./Routes/User");
app.use("/api/user", UserRoute);

const BlogRoute = require("./Routes/Blog");
app.use("/api/blog", BlogRoute);

// Sync models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully.");

    await sequelize.sync({ alter: true }); // Sync tables (use `force: true` to drop tables and recreate them)
    console.log("All models were synchronized successfully.");
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
})();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
