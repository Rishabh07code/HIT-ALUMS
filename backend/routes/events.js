// Filename: backend/routes/events.js
const router = require("express").Router();
const Event = require("../models/Event");

// 1. Event Post karna (Alumni Only)
router.post("/add", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const savedEvent = await newEvent.save();
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Sare Events dikhana
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;