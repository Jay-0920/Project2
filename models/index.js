"use strict";
const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({
  path: './.env',
});

const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_PORT = process.env.DB_PORT;


var fs = require("fs");
var path = require("path");

const sequelize = new Sequelize(DB_NAME, 'root', DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: DB_PORT
});


var basename = path.basename(module.filename);
var db = {};

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(function (file) {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize);
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;