const express = require("express");
const sequelize = require("./Models/dataBase");
const path = require("path");
const cors = require('cors')

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"]
}));
app.use(express.json());

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const AuthRoute = require("./Routes/Auth");
app.use("/api/auth", AuthRoute);

const UserRoute = require("./Routes/User");
app.use("/api/user", UserRoute);

const BlogRoute = require("./Routes/Blog");
app.use("/api/blog", BlogRoute);

const CommentRoute = require("./Routes/comment");
app.use("/api/comment", CommentRoute);

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
