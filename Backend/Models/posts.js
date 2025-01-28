const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user');

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  imageUrls: {
    type: DataTypes.JSON, 
    allowNull: true,
    defaultValue: [],
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Define relationship with User
User.hasMany(BlogPost, { foreignKey: 'userId', onDelete: 'CASCADE' });
BlogPost.belongsTo(User, { foreignKey: 'userId' });

module.exports = BlogPost;
