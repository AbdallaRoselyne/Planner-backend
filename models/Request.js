const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requestedName: { type: String, required: true },
  projectCode: { type: String, required: true },
  project: { type: String, default: "" },
  department: { type: String, default: "" },
  hours: { type: Number, required: true },
  requester: { type: String, required: true },
  Task: { type: String, required: true },
  Notes: { type: String },
});

module.exports = mongoose.model("Request", requestSchema);