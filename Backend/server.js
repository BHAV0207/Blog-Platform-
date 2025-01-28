const express = require('express');
const sequelize = require('./models/db');
// const User = require('./models/user');
// const BlogPost = require('./models/posts');
// const Comment = require('./models/comments');
// const Image = require('./models/Image');

const app = express();
app.use(express.json());

// Sync models with the database
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully.');

    await sequelize.sync({ alter: true }); // Sync tables (use `force: true` to drop tables and recreate them)
    console.log('All models were synchronized successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
