// Filename: client/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser).user);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: '20px', textAlign: 'center', maxWidth: '600px', margin: 'auto' }}>
      <h1>Welcome, {user.name}! 👋</h1>
      <h3>Role: <span style={{ color: 'green' }}>{user.role}</span></h3>
      <p>Department: {user.branch}</p>
      
      {/* Agar Alumni hai to ye dikhao */}
      {user.role === 'Alumni' && (
        <div style={{ border: '1px solid #ddd', padding: '10px', margin: '20px auto', background: '#f8f9fa', borderRadius: '8px' }}>
          <h4>🎓 Alumni Dashboard</h4>
          <p>You can post jobs and organize events.</p>
        </div>
      )}

      {/* --- MENU BUTTONS (Yahan teeno buttons hain) --- */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        
        {/* 1. Jobs Button */}
        <button onClick={() => navigate("/jobs")} style={btnStyle}>
          💼 Browse Jobs
        </button>

        {/* 2. Chat Button (Jo miss ho gaya tha) */}
        <button onClick={() => navigate("/chat")} style={{ ...btnStyle, backgroundColor: '#6f42c1' }}>
          💬 Join Community Chat
        </button>

        {/* 3. Events Button (Jo abhi banaya) */}
        <button onClick={() => navigate("/events")} style={{ ...btnStyle, backgroundColor: '#d63384' }}>
          📅 Events & Reunions
        </button>
      </div>

      {/* Logout Button */}
      <button onClick={handleLogout} style={{ ...btnStyle, backgroundColor: '#dc3545', marginTop: '40px' }}>
        Logout 🚪
      </button>
    </div>
  );
}

// Button ka common style taaki sab sundar dikhe
const btnStyle = {
  padding: '15px',
  fontSize: '16px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
};