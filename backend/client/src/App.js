// Filename: client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Sare components import karo
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Jobs from './components/Jobs';
import Chat from './components/Chat';   // <--- Ye MISSING tha
import Events from './components/Events'; // <--- Ye bhi check kar lo

// Simple Home Page Component
const Home = () => (
  <div style={{ textAlign: 'center', marginTop: '50px' }}>
    <h1>Welcome to HIT-ALUMS 🎓</h1>
    <p>Connecting Students with Alumni</p>
    <div style={{ marginTop: '20px' }}>
      <Link to="/login">
        <button style={btnStyle}>Login</button>
      </Link>
      <Link to="/signup">
        <button style={{ ...btnStyle, marginLeft: '10px', backgroundColor: '#28a745' }}>Sign Up</button>
      </Link>
    </div>
  </div>
);

const btnStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '5px'
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/chat" element={<Chat />} />     {/* <--- Ye Line Zaroori Hai */}
        <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;