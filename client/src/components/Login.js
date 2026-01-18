// Filename: client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  // State for the custom alert (Toast)
  const [toast, setToast] = useState(null); // { message, type: 'success' | 'error' }

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Helper to show toast
  const showToast = (message, type) => {
    setToast({ message, type });
    // Hide toast after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      
      // Save user data
      localStorage.setItem("user", JSON.stringify(res.data));
      
      // Show Success Toast
      showToast(`Login Successful! Welcome ${res.data.user.name}`, 'success');
      
      // Small delay so user can read the success message before redirecting
      setTimeout(() => {
        navigate("/dashboard"); 
      }, 1500);

    } catch (err) {
      // Show Error Toast
      showToast("Invalid Email or Password!", 'error');
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

          /* Clean Background */
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f3f4f6; /* Neutral light gray */
            padding: 20px;
          }

          /* Responsive Card */
          .login-card {
            background: #ffffff;
            padding: 40px;
            width: 100%;
            max-width: 400px; /* Standard width for login forms */
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            text-align: center;
            transition: all 0.3s ease;
          }

          .login-header h2 {
            color: #111827;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 8px;
          }

          .login-header p {
            color: #6b7280;
            font-size: 14px;
            margin-bottom: 32px;
          }

          .form-group {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .custom-input {
            width: 100%;
            padding: 12px 16px;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 15px;
            color: #374151;
            outline: none;
            transition: border-color 0.2s, box-shadow 0.2s;
            background-color: #fff;
          }

          .custom-input:focus {
            border-color: #2563eb; /* Professional Blue */
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
          }

          .btn-primary {
            width: 100%;
            padding: 12px;
            background-color: #2563eb;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .btn-primary:hover {
            background-color: #1d4ed8;
          }

          .divider {
            margin: 24px 0;
            position: relative;
            text-align: center;
          }

          .divider::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            height: 1px;
            background: #e5e7eb;
            z-index: 0;
          }

          .divider span {
            background: #fff;
            padding: 0 10px;
            color: #9ca3af;
            font-size: 12px;
            position: relative;
            z-index: 1;
          }

          .btn-secondary {
            width: 100%;
            padding: 12px;
            background: transparent;
            color: #4b5563;
            border: 1px solid #d1d5db;
            border-radius: 6px;
            font-size: 15px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
          }

          .btn-secondary:hover {
            background: #f9fafb;
            border-color: #9ca3af;
            color: #111827;
          }

          /* TOAST NOTIFICATION STYLES */
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

          .toast.success {
            background-color: #10b981; /* Green */
          }

          .toast.error {
            background-color: #ef4444; /* Red */
          }

          @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }

          /* Mobile Responsiveness tweaks */
          @media (max-width: 480px) {
            .login-card {
              padding: 24px;
              box-shadow: none; /* Flatter look on mobile */
              background: transparent; /* Seamless on very small screens */
            }
            .login-container {
              background: #fff; /* White background for mobile simplicity */
              align-items: flex-start;
              padding-top: 40px;
            }
            .toast {
              left: 20px; /* Center toast on mobile */
              right: 20px;
              text-align: center;
              justify-content: center;
            }
          }
        `}
      </style>

      {/* Toast Notification Component */}
      {toast && (
        <div className={`toast ${toast.type}`}>
          <span>{toast.type === 'success' ? '✅' : '❌'}</span>
          {toast.message}
        </div>
      )}

      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>🔐 Login</h2>
            <p>Enter your credentials to access your account</p>
          </div>
          
          <form onSubmit={handleSubmit} className="form-group">
            <input 
              type="email" 
              name="email" 
              className="custom-input"
              placeholder="name@company.com" 
              onChange={handleChange} 
              required 
            />
            
            <input 
              type="password" 
              name="password" 
              className="custom-input"
              placeholder="••••••••" 
              onChange={handleChange} 
              required 
            />
            
            <button type="submit" className="btn-primary">
              Sign In
            </button>
          </form>

          <div className="divider">
            <span>OR CONTINUE WITH</span>
          </div>

          <div className="signup-section">
            <Link to="/signup" style={{ textDecoration: 'none' }}>
              <button className="btn-secondary">
                Create New Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}