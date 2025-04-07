const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
  const authHeader = request.header("Authorization");
  if (!authHeader) {
    return response.send("Unauthorized User");
  }

  const token = authHeader.split(" ")[1];

  try {
    const verified = jwt.verify(token, "sajak");
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
