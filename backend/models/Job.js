// Filename: backend/models/Job.js
const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  postedBy: { type: String, required: true }, // Alumni ka naam
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);