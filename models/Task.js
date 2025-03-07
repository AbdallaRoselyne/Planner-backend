const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  requestedName: { type: String, required: true },
  email: { type: String, required: true }, // Add email field
  Task: { type: String, required: true },
  hours: { type: Number, required: true },
  projectCode: { type: String, required: true },
  project: { type: String, required: true },
  requester: { type: String, required: true },
  department: { type: String, required: true },
  Notes: { type: String, default: "" },
  status: { type: String, enum: ["Approved", "Rejected"], required: true },
  comment: { type: String, default: "" }, // For rejected tasks
  approvedHours: { type: Number, default: 0 }, // For approved tasks
  timeSlot: { type: String, default: "" }, // For approved tasks
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Task", taskSchema);