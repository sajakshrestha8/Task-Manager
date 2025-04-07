const app = require("express");
const TaskController = require("../../controllers/task.controller");
const router = app.Router();

router.post("/addtask", TaskController.createNewTask);
router.get("/viewtask", TaskController.getAllTask);
router.delete("/deletetask/:id", TaskController.deleteTask);

module.exports = router;
