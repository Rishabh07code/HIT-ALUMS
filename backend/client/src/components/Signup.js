// Filename: client/src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student", // Default role
    branch: "ECE",
    batch: "2022-2026"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Backend ko data bhejna
      await axios.post("http://localhost:5000/api/auth/register", user);
      alert("Registration Successful!");
      navigate("/"); // Wapas home page par bhej do
    } catch (err) {
      alert("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Signup for HIT-ALUMS</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        
        <select name="role" onChange={handleChange}>
          <option value="Student">Student</option>
          <option value="Alumni">Alumni</option>
        </select>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#28a745', color: 'white', border:'none' }}>
          Register
        </button>
      </form>
    </div>
  );
}