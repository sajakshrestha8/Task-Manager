const app = require("express");
const TaskController = require("../../controllers/task.controller");
const router = app.Router();
const verification = require("../../config/auth/auth");

router.post("/tasks", verification, TaskController.createNewTask);
router.get("/tasks", verification, TaskController.getAllTask);
router.delete("/tasks/:id", verification, TaskController.deleteTask);

module.exports = router;
