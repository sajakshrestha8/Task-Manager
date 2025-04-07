const app = require("express");
const TaskController = require("../../controllers/task.controller");
const router = app.Router();
const verification = require("../../config/auth/auth");

router.post("/addtask", verification, TaskController.createNewTask);
router.get("/viewtask", verification, TaskController.getAllTask);
router.delete("/deletetask/:id", verification, TaskController.deleteTask);

module.exports = router;
