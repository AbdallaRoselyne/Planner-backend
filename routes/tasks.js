const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const User = require("../models/User");

// Fetch all tasks (approved/rejected)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks" });
  }
});

// Fetch tasks for a specific user (based on email)
router.get("/user/:email", async (req, res) => {
  try {
    const tasks = await Task.find({ email: req.params.email }); // Filter by email
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user tasks" });
  }
});

// Update a task (approve/reject)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { status, comment, approvedHours, timeSlot } = req.body;

  try {
    // Find the task by ID
    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task's fields
    task.status = status;
    task.comment = comment;
    task.approvedHours = approvedHours;
    task.timeSlot = timeSlot;
    task.updatedAt = Date.now();

    // Save the updated task
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;