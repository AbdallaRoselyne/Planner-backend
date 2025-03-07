const mongoose = require('mongoose');

const approvedSchema = new mongoose.Schema({

    requestedName: { type: String, required: true },
    projectCode: { type: String, required: true },
    project: { type: String, default: "" },
    department: { type: String, default: "" },
    hours: { type: Number, required: true },
    requester: { type: String, required: true },
    Task: { type: String, required: true },
    Notes: { type: String },
});