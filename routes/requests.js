const express = require("express");
const Request = require("../models/Request");

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

// ➤ Get all requested resources
router.get("/", async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ➤ Search requests by name or project code
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    const requests = await Request.find({
      $or: [
        { requestedName: { $regex: query, $options: "i" } },
        { projectCode: { $regex: query, $options: "i" } },  
      ],
    });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 🟢 ➤ Update (Edit) a request
router.put("/:id", async (req, res) => {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRequest) return res.status(404).json({ error: "Request not found" });
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🟢 ➤ Delete a request
router.delete("/:id", async (req, res) => {
  try {
    const deletedRequest = await Request.findByIdAndDelete(req.params.id);
    if (!deletedRequest) return res.status(404).json({ error: "Request not found" });
    res.json({ message: "Request deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
