const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (request, response, next) => {
  const authHeader = request.header("Authorization");
  if (!authHeader) {
    return response.send("Unauthorized User");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.id = verified.Email;
    next();
  } catch (error) {
    response.status(403).json({
      message: "Something went wrong",
      error: error,
    });
  }
};

module.exports = verifyToken;
