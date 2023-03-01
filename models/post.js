const { DataTypes } = require('sequelize');
const sequelize = require('../models/index.js')
const User = require('./user.js');

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    validation: {
      len: [5]
    }
  }
});

module.exports = Post;