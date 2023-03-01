const { DataTypes } = require('sequelize');
const sequelize = require('../models/index.js')
const Post = require('./post.js');

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  paranoid: true
});

User.hasMany(Post, {
  foreignKey: "authorId",
  ondelete: "cascade"
})

Post.belongsTo(User, {
  foreignKey: "authorId"
});

module.exports = User;