// Filename: backend/models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String, required: true }, // Simple string for now (e.g., "25th Dec 2025")
  location: { type: String, required: true },
  description: { type: String, required: true },
  postedBy: { type: String, required: true }, // Alumni name
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Event", eventSchema);