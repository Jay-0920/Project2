const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config({
  path: './.env',
});

const { DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, DB_HOST_NAME } = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST_NAME,
  dialect: 'mysql',
  port: DB_PORT
});


sequelize.sync();

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();

module.exports = sequelize;