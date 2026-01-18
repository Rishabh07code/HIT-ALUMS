// Filename: client/src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    branch: "ECE", // Default
    batch: "2022-2026"
  });

  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const showToast = (message, type) => {
    setToast({ message, type });
    setTimeout(() => { setToast(null); }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", user);
      showToast("Registration Successful! Redirecting...", 'success');
      
      // Delay redirect slightly to show success message
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      showToast("Registration Failed. Try again.", 'error');
      console.error(err);
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

          * {
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
          }

          .signup-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f3f4f6;
            padding: 20px;
          }

          .signup-card {
            background: #ffffff;
            padding: 40px;
            width: 100%;
            max-width: 480px;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            animation: fadeIn 0.4s ease-out;
          }

          .header {
            text-align: center;
            margin-bottom: 30px;
          }

          .header h2 {
            color: #111827;
            font-size: 26px;
            font-weight: 800;
            margin-bottom: 8px;
          }

          .header p {
            color: #6b7280;
            font-size: 14px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .input-label {
            font-size: 13px;
            font-weight: 600;
            color: #374151;
            margin-bottom: 4px;
            display: block;
          }

          .custom-input, .custom-select {
            width: 100%;
            padding: 12px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 15px;
            color: #1f2937;
            background: #fff;
            transition: all 0.2s;
            outline: none;
          }

          .custom-input:focus, .custom-select:focus {
            border-color: #2563eb;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          /* Grid for side-by-side inputs */
          .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .btn-primary {
            width: 100%;
            padding: 14px;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
            margin-top: 10px;
          }

          .btn-primary:hover {
            background-color: #1d4ed8;
          }

          .login-link {
            text-align: center;
            margin-top: 24px;
            font-size: 14px;
            color: #6b7280;
          }

          .login-link a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 600;
          }

          .login-link a:hover {
            text-decoration: underline;
          }

          /* Toast Styles */
          .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            font-size: 14px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            animation: slideIn 0.3s ease-out;
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 10px;
          }
          .toast.success { background-color: #10b981; }
          .toast.error { background-color: #ef4444; }

          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
          
          @media (max-width: 500px) {
            .form-row { grid-template-columns: 1fr; } 
          }
        `}
      </style>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          {toast.message}
        </div>
      )}

      <div className="signup-container">
        <div className="signup-card">
          
          <div className="header">
            <h2>Create an Account</h2>
            <p>Join the HIT-ALUMS community today</p>
          </div>

          <form onSubmit={handleSubmit} className="form-group">
            
            {/* Name */}
            <div>
              <label className="input-label">Full Name</label>
              <input 
                type="text" 
                name="name" 
                className="custom-input"
                placeholder="Ex. Rishabh Kumar" 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Email */}
            <div>
              <label className="input-label">Email Address</label>
              <input 
                type="email" 
                name="email" 
                className="custom-input"
                placeholder="name@example.com" 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Password */}
            <div>
              <label className="input-label">Password</label>
              <input 
                type="password" 
                name="password" 
                className="custom-input"
                placeholder="Create a strong password" 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Row: Role & Branch */}
            <div className="form-row">
              <div>
                <label className="input-label">I am a</label>
                <select name="role" className="custom-select" onChange={handleChange} value={user.role}>
                  <option value="Student">Student</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div>
                <label className="input-label">Branch</label>
                <select name="branch" className="custom-select" onChange={handleChange} value={user.branch}>
                  <option value="ECE">ECE</option>
                  <option value="CSE">CSE</option>
                  <option value="IT">IT</option>
                  <option value="EE">EE</option>
                  <option value="ME">ME</option>
                  <option value="CE">CE</option>
                </select>
              </div>
            </div>

            {/* Batch */}
            <div>
              <label className="input-label">Batch Year</label>
              <input 
                type="text" 
                name="batch" 
                className="custom-input"
                placeholder="Ex. 2022-2026" 
                onChange={handleChange} 
                value={user.batch}
                required 
              />
            </div>

            <button type="submit" className="btn-primary">
              Register Account
            </button>
          </form>

          <div className="login-link">
            Already have an account? <Link to="/login">Sign in here</Link>
          </div>

        </div>
      </div>
    </>
  );
}