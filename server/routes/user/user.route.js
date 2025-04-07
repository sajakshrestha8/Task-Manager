const app = require("express");
const UserController = require("../../controllers/user.controller");
const router = app.Router();

router.post("/register", UserController.RegisterUser);

module.exports = router;
