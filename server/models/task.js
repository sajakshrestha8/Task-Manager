const sequelize = require("sequelize");
const connection = require("../config/database/connection");
const user = require("./user");

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
    validate: {
      len: [1, 255],
    },
  },
  Description: {
    type: sequelize.STRING,
    allowNull: false,
    validate: {
      len: [1, 500],
    },
  },
});

user.hasMany(task, {
  foreignKeys: "UserId",
});

module.exports = task;
