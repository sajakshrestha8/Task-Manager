const app = require("express");
const UserController = require("../../controllers/user.controller");
const router = app.Router();

router.post("/register", UserController.RegisterUser);
router.post("/login", UserController.LogInUser);

module.exports = router;
