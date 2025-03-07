const express = require("express");
const Request = require("../models/Request");
const Task = require("../models/Task");
const router = express.Router();

// ➤ Add a new resource request
router.post("/", async (req, res) => {
  try {
    const newRequest = new Request(req.body);
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ➤ Get all pending requests
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find({ status: "Pending" });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Approve a request
router.put("/:id/approve", async (req, res) => {
  const { approvedHours, timeSlot } = req.body;

  if (!approvedHours || !timeSlot) {
    return res.status(400).json({ error: "Missing required fields: approvedHours, timeSlot" });
  }

  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    // Save the approved task to the Task collection
    const newTask = new Task({
      requestedName: request.requestedName,
      email: request.email,
      Task: request.Task,
      hours: request.hours,
      projectCode: request.projectCode,
      project: request.project,
      requester: request.requester,
      department: request.department,
      Notes: request.Notes,
      status: "Approved",
      approvedHours,
      timeSlot,
    });

    await newTask.save();

    // Remove the request from the Request collection
    await Request.findByIdAndDelete(req.params.id);

    // Send email notification (placeholder for email integration)
    sendEmailNotification(newTask);

    res.json({ message: "Request approved", task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Reject a request
router.put("/:id/reject", async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ error: "Comment is required for rejection" });
  }

  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    // Save the rejected task to the Task collection
    const newTask = new Task({
      requestedName: request.requestedName,
      email: request.email,
      Task: request.Task,
      hours: request.hours,
      projectCode: request.projectCode,
      project: request.project,
      requester: request.requester,
      department: request.department,
      Notes: request.Notes,
      status: "Rejected",
      comment,
    });

    await newTask.save();

    // Remove the request from the Request collection
    await Request.findByIdAndDelete(req.params.id);

    res.json({ message: "Request rejected", task: newTask });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Placeholder function for sending email notifications
const sendEmailNotification = (task) => {
  console.log(`Email sent to ${task.email}: Your task has been approved.`);
  // Integrate with an email service (e.g., Nodemailer) here
};

module.exports = router;