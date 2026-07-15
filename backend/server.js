const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/database");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/todos", todoRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Todo API is Running...");
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});