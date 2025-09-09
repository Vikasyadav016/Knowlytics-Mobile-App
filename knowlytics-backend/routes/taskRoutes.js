const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// Get tasks (protected)
router.get("/", auth, getTasks);

// Create task (protected)
router.post("/", auth, createTask);

// Update task (protected)
router.put("/:id", auth, updateTask);

// Delete task (protected)
router.delete("/:id", auth, deleteTask);

module.exports = router;
