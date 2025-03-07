const express = require("express");
const Task = require("../models/Task");
const router = express.Router();

// ➤ Fetch all approved/rejected tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Add a new approved task (manually)
router.post("/", async (req, res) => {
  try {
    const {
      requestedName,
      email,
      Task,
      hours,
      projectCode,
      project,
      requester,
      department,
      Notes,
      approvedHours,
      timeSlot,
    } = req.body;

    const newTask = new Task({
      requestedName,
      email,
      Task,
      hours,
      projectCode,
      project,
      requester,
      department,
      Notes,
      status: "Approved",
      approvedHours,
      timeSlot,
    });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ➤ Edit an approved/rejected task
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ➤ Delete an approved/rejected task
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;