const connection = require("../config/database/connection");
const user = require("../models/user");
const { where } = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserController = {
  RegisterUser: async (request, response) => {
    const { username, email, password } = request.body;
    const hashPass = await bcrypt.hash(password, 10);
    try {
      let verifyEmail = await user.findOne({
        where: {
          Email: email,
        },
      });

      if (verifyEmail) {
        throw new Error("Email already registered");
      }

      console.log(verifyEmail);
      const data = await user.create({
        UserName: username,
        Email: email,
        Password: hashPass,
      });

      return response.status(200).json({
        message: "User created Successfully",
        data: {
          id: data.id,
          email: data.Email,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        response.status(409).send(error.message);
      }
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
        throw new Error("Invalid credentials");
      }

      let hashPass = await bcrypt.compare(password, User.Password);

      if (!hashPass) {
        throw new Error("Invalid credentials");
      }

      const token = jwt.sign({ Email: User.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1hr",
      });

      return response.json({
        message: "Login Successfull",
        token: token,
      });
    } catch (error) {
      if (error instanceof Error) {
        return response.status(403).send({ message: error.message });
      }

      console.log(error);
    }
  },
};

module.exports = UserController;
