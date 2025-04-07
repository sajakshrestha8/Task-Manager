const connection = require("../config/database/connection");
const user = require("../models/user");
const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
  RegisterUser: async (request, response) => {
    const { username, email, password } = request.body;
    const hashPass = await bcrypt.hash(password, 10);
    try {
      await connection
        .sync()
        .then(() => {
          return user.create({
            UserName: username,
            Email: email,
            Password: hashPass,
          });
        })
        .then((data) => {
          response.send(data);
        });
    } catch (error) {
      console.log(error);
    }
  },

  LogInUser: async (request, response) => {
    const { email, password } = request.body;

    try {
      let User = await user.findOne({
        where: {
          Email: email,
        },
      });

      if (!User) {
        return response.send("User not found");
      } else {
        let hashPass = await bcrypt.compare(password, User.Password);

        if (!hashPass) {
          return response.send("Wrong Password");
        }

        const token = jwt.sign({ Email: User.id }, "sajak", {
          expiresIn: "1hr",
        });

        return response.json({
          message: "Login Successfull",
          token: token,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = UserController;
