const express = require("express");
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const auth = require("../middlewares/auth");
const methodNotAllowed = require("../utils/methodNotAllowed");
const router = express.Router();

router.get("/", auth, getAllTasks);

router.post("/", auth, createTask);

router.all("/", auth, methodNotAllowed);

router.get("/:id", auth, getTask);

router.patch("/:id", auth, updateTask);

router.delete("/:id", auth, deleteTask);

module.exports = router;
