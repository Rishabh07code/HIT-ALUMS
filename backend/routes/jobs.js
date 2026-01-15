// Filename: backend/routes/jobs.js
const router = require("express").Router();
const Job = require("../models/Job");

// 1. Job Post karna (Sirf Alumni ke liye)
router.post("/add", async (req, res) => {
  try {
    const newJob = new Job(req.body);
    const savedJob = await newJob.save();
    res.status(200).json(savedJob);
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2. Sari Jobs dikhana (Students ke liye)
router.get("/all", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }); // Latest pehle dikhega
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;