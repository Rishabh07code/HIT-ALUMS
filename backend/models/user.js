// Filename: backend/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Student', 'Alumni'], 
    default: 'Student' 
  },
  // Extra Details
  branch: { type: String, default: 'ECE' }, // Jaise tumhari branch ECE hai
  batch: { type: String }, // e.g., 2022-2026
  
  // Sirf Alumni ke liye fields
  company: { type: String, default: '' },
  designation: { type: String, default: '' },
  
  // Verification (PPT me mentioned tha)
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);