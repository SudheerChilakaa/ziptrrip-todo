const Todo = require("../models/Todo");

// Create Todo
const createTodo = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    const todo = await Todo.create({
      title,
      description,
      priority,
      status,
      dueDate,
    });

    res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Todos with Search, Filter, Sort & Pagination
const getAllTodos = async (req, res) => {
  try {
    const {
      search,
      status,
      priority,
      sort,
      page = 1,
      limit = 5,
    } = req.query;

    const query = {};

    // Search
    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    // Status Filter
    if (status) {
      query.status = status;
    }

    // Priority Filter
    if (priority) {
      query.priority = priority;
    }

    let sortOption = {
      createdAt: -1,
    };

    if (sort === "dueDate") {
      sortOption = {
        dueDate: 1,
      };
    }

    // Better priority sorting
    if (sort === "priority") {
      sortOption = {
        priority: -1,
      };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const total = await Todo.countDocuments(query);

    const todos = await Todo.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Todo
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};