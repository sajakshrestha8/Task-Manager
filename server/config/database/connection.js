const Sequelize = require("sequelize");

const connection = new Sequelize("TaskManager", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

connection
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log("Connection failed", err));

module.exports = connection;
