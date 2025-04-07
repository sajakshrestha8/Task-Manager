const app = require("express");
const taskRoute = require("./task/task.route");
const userRoute = require("./user/user.route");
const router = app.Router();

router.use("/task", taskRoute);
router.use("/user", userRoute);

module.exports = router;
