// Filename: client/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // <-- Link import kiya

export default function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
      localStorage.setItem("user", JSON.stringify(res.data));
      alert("Login Successful! Welcome " + res.data.user.name);
      navigate("/dashboard"); 
    } catch (err) {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto', textAlign: 'center', marginTop: '50px' }}>
      <h2 style={{ marginBottom: '20px' }}>🔐 Login</h2>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          name="email" 
          placeholder="Enter Email" 
          onChange={handleChange} 
          required 
          style={inputStyle}
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Enter Password" 
          onChange={handleChange} 
          required 
          style={inputStyle}
        />
        
        <button type="submit" style={btnStyle}>
          Login
        </button>
      </form>

      {/* --- Naya Signup Link Yahan Hai --- */}
      <div style={{ marginTop: '20px' }}>
        <p>Don't have an account?</p>
        <Link to="/signup">
          <button style={{ ...btnStyle, background: '#28a745', marginTop: '5px' }}>
            Create New Account
          </button>
        </Link>
      </div>

    </div>
  );
}

// Styling
const inputStyle = {
  padding: '12px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px'
};

const btnStyle = {
  padding: '12px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
  fontWeight: 'bold'
};