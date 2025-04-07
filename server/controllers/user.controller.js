const { response } = require("express");
const connection = require("../config/database/connection");
const user = require("../models/user");

const UserController = {
  RegisterUser: async (request, response) => {
    const { username, email, password } = request.body;
    try {
      await connection
        .sync()
        .then(() => {
          return user.create({
            UserName: username,
            Email: email,
            Password: password,
          });
        })
        .then((data) => {
          response.send(data);
        });
    } catch (error) {
      console.log(error);
    }
  },

  LogInUser: async (request, response) => {},
};

module.exports = UserController;
