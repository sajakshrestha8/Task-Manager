const { where, SequelizeScopeError, Sequelize } = require("sequelize");
const connection = require("../config/database/connection");
const task = require("../models/task");
const user = require("../models/user");

const TaskController = {
  createNewTask: async (request, response) => {
    const { title, description } = request.body;
    const { id } = request;

    if (!id) response.sendStatus(500);
    try {
      const createdData = await task.create({
        Title: title,
        Description: description,
        UserId: id,
      });

      if (title === null)
        return response
          .status(404)
          .send({ message: "Title shouldnot be empty" });

      return response.send(createdData);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        return response.status(400).send({
          message: error.message,
        });
      }
      return response.status(500).send({
        message: "something went wrong",
      });
    }
  },

  getAllTask: async (request, response) => {
    try {
      const { id } = request;

      const data = await user.findByPk(id, {
        include: task,
      });

      response.status(200).send(data.Tasks);
    } catch (error) {
      return response.status(500).send(error);
    }
  },

  deleteTask: async (request, response) => {
    const { id: taskId } = request.params;
    const { id: userId } = request;
    try {
      const validTask = await task.findByPk(taskId);

      if (userId !== validTask.UserId)
        return response
          .status(401)
          .send("You are not allowed to delete this data");

      await task.destroy({
        where: {
          Id: taskId,
        },
      });

      return response.send("Data removed successfully");
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = TaskController;
