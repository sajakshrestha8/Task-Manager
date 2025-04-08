const Sequelize = require("sequelize");
require("dotenv").config();

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    dialect: process.env.DIALECT,
    host: process.env.HOST,
  }
);

connection
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log("Connection failed", err));

async function syncDatabase() {
  await connection.sync();
  console.log("All models were synchronized successfully.");
}

syncDatabase();

module.exports = connection;
