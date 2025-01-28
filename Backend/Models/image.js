// const { DataTypes } = require('sequelize');
// const sequelize = require('./db');
// const BlogPost = require('./posts');

// const Image = sequelize.define('Image', {
//   id: {
//     type: DataTypes.UUID,
//     defaultValue: DataTypes.UUIDV4,
//     primaryKey: true,
//   },
//   url: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   uploadedAt: {
//     type: DataTypes.DATE,
//     defaultValue: DataTypes.NOW,
//   },
// });

// // Define relationship with BlogPost
// BlogPost.hasMany(Image, { foreignKey: 'blogPostId', onDelete: 'CASCADE' });
// Image.belongsTo(BlogPost, { foreignKey: 'blogPostId' });

// module.exports = Image;
