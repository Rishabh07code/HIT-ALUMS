// Filename: backend/routes/auth.js
const router = require("express").Router();
const User = require("../models/User");

// REGISTER API (Naya user banane ke liye)
router.post("/register", async (req, res) => {
  try {
    // Frontend se data lena
    const { name, email, password, role, branch, batch } = req.body;

    // Check karna ki user pehle se hai ya nahi
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists!" });
    }

    // Naya user create karna
    const newUser = new User({
      name,
      email,
      password, // Note: Real project me password encrypt (hash) karna chahiye
      role,
      branch,
      batch
    });

    // Database me save karna
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN API (Login ke liye)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // User dhundna
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Password check (Simple check for now)
    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password!" });
    }

    res.status(200).json({ message: "Login Successful", user });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;