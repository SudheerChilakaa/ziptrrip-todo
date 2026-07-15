const express = require("express");

const {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

// CRUD Routes
router.post("/", createTodo);
router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;