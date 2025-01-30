const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const User = require('./user'); 
const BlogPost = require('./posts');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
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

// Define relationships
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' });
Comment.belongsTo(User, { foreignKey: 'userId' });

BlogPost.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(BlogPost, { foreignKey: 'postId' });

module.exports = Comment;
