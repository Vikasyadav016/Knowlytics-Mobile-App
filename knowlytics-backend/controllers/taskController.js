const Task = require("../models/Task");

// Get all tasks for logged in user
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Create new task
exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
      userId: req.user.id,
      title: req.body.title,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { title, completed } = req.body;

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check user owns task
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    task.title = title !== undefined ? title : task.title;
    task.completed = completed !== undefined ? completed : task.completed;

    await task.save();
    res.json(task);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    // Check user owns task
    if (task.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorized" });
    }

    await task.remove();
    res.json({ msg: "Task removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
