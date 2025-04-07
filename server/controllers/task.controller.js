const { where } = require("sequelize");
const connection = require("../config/database/connection");
const task = require("../models/task");
const user = require("../models/user");

const TaskController = {
  createNewTask: async (request, response) => {
    const { title, description } = request.body;
    try {
      await connection
        .sync()
        .then(() => {
          return task.create({
            Title: title,
            Description: description,
          });
        })
        .then((data) => {
          console.log(data);
          response.send(data);
        });
    } catch (error) {
      console.log(error);
    }
  },

  getAllTask: async (request, response) => {
    try {
      await connection
        .sync()
        .then(() => {
          return task.findAll({
            attributes: ["Id", "Title", "Description"],
            where: {
              Id: request.id,
            },
          });
        })
        .then((data) => {
          response.send(data);
        });
    } catch (error) {
      console.log(error);
    }
  },

  deleteTask: async (request, response) => {
    const { id } = request.params;
    try {
      await connection
        .sync()
        .then(() => {
          return task.destroy({
            where: {
              Id: id,
            },
          });
        })
        .then(() => {
          response.json("task deleted successfully");
        });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = TaskController;
