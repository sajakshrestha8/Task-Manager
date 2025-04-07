const Sequelize = require("sequelize");

const connection = new Sequelize("TaskManager", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

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
