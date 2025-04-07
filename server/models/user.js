const sequelize = require("sequelize");
const connection = require("../config/database/connection");
const task = require("./task");

const user = connection.define("User", {
  UserName: {
    type: sequelize.STRING,
    allowNull: false,
  },
  Email: {
    type: sequelize.STRING,
    allowNull: false,
  },
  Password: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = user;
