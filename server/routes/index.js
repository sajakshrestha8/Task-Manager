const app = require("express");
const taskRoute = require("./task/task.route");
const userRoute = require("./user/user.route");
const router = app.Router();

/**
 * @openapi
 * /:
 * paths:
 *  /task/tasks:
 *   get:
 *     tags:
 *
 *
 *     responses:
 *       200:
 *         description: User Tasks.
 *         content:
 *          application/json:
 *              schema:
 *                  type: string,
 *                  example: pong
 */

router.use("/task", taskRoute);
router.use("/user", userRoute);

module.exports = router;
