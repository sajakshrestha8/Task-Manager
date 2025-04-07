const sequelize = require("sequelize");
const connection = require("../config/database/connection");

const task = connection.define("Task", {
  Id: {
    type: sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  Title: {
    type: sequelize.STRING,
    allowNull: false,
  },
  Description: {
    type: sequelize.STRING,
    allowNull: false,
  },
});

module.exports = task;
