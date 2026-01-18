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

  if (!user) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc' }}>
      <div className="loader">Loading...</div>
    </div>
  );

  return (
    <div className="app-container">
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

          :root {
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --bg-main: #f8fafc;
            --surface: #ffffff;
            --text-main: #0f172a;
            --text-muted: #64748b;
            --border: #e2e8f0;
          }

          * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            font-family: 'Plus Jakarta Sans', sans-serif;
          }

          body {
            background-color: var(--bg-main);
            color: var(--text-main);
          }

          /* --- NAVBAR --- */
          .navbar {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 0 30px;
            height: 70px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          }

          .nav-brand {
            font-weight: 800;
            font-size: 20px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .nav-right {
            display: flex;
            align-items: center;
            gap: 20px;
          }

          .user-profile-snippet {
            display: flex;
            align-items: center;
            gap: 10px;
          }

          .avatar-circle {
            width: 36px;
            height: 36px;
            background: linear-gradient(135deg, #6366f1, #a855f7);
            border-radius: 50%;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            font-size: 14px;
          }

          .logout-btn {
            background: transparent;
            border: 1px solid #fee2e2;
            color: #ef4444;
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .logout-btn:hover {
            background: #fef2f2;
            border-color: #ef4444;
          }

          /* --- MAIN CONTENT --- */
          .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
          }

          /* Hero Section */
          .hero-section {
            margin-bottom: 40px;
          }

          .hero-title {
            font-size: 32px;
            font-weight: 800;
            color: var(--text-main);
            margin-bottom: 10px;
          }

          .hero-name {
            background: linear-gradient(to right, #4f46e5, #9333ea);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .badges-container {
            display: flex;
            gap: 10px;
            margin-top: 15px;
          }

          .badge {
            padding: 6px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .badge-role { background: #dbeafe; color: #1e40af; }
          .badge-branch { background: #f3f4f6; color: #374151; }

          /* Alumni Banner */
          .alumni-banner {
            background: linear-gradient(to right, #fff7ed, #ffedd5);
            border: 1px solid #fed7aa;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 40px;
            display: flex;
            align-items: start;
            gap: 15px;
            color: #9a3412;
          }

          /* Grid */
          .dashboard-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 25px;
          }

          .feature-card {
            background: var(--surface);
            padding: 30px;
            border-radius: 16px;
            border: 1px solid var(--border);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            gap: 15px;
            position: relative;
            overflow: hidden;
          }

          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
            border-color: var(--primary);
          }

          .card-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            margin-bottom: 10px;
          }

          .icon-jobs { background: #e0e7ff; color: #4338ca; }
          .icon-chat { background: #fae8ff; color: #86198f; }
          .icon-network { background: #ecfeff; color: #0e7490; }
          .icon-events { background: #fce7f3; color: #be185d; }

          .card-title {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-main);
          }

          .card-desc {
            font-size: 14px;
            color: var(--text-muted);
            line-height: 1.5;
          }

          .arrow-icon {
            align-self: flex-start;
            color: var(--primary);
            font-weight: 700;
            margin-top: auto;
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
          }

          .feature-card:hover .arrow-icon {
            opacity: 1;
            transform: translateX(0);
          }

          /* Mobile Responsive */
          @media (max-width: 768px) {
            .navbar { padding: 0 20px; }
            .nav-brand span { display: none; } /* Hide text on very small screens if needed */
            .hero-title { font-size: 24px; }
            .dashboard-grid { grid-template-columns: 1fr; }
          }
        `}
      </style>

      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="nav-brand">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>HIT Alums</span>
        </div>
        
        <div className="nav-right">
          <div className="user-profile-snippet">
            <div className="avatar-circle">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {/* Show name only on larger screens */}
            <span style={{ fontSize: '14px', fontWeight: '600', display: window.innerWidth < 600 ? 'none' : 'block' }}>
              {user.name.split(" ")[0]}
            </span>
          </div>
          
          <button onClick={handleLogout} className="logout-btn">
            Logout
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </button>
        </div>
      </nav>

      {/* --- MAIN DASHBOARD CONTENT --- */}
      <div className="main-content">
        
        {/* HERO SECTION */}
        <div className="hero-section">
          <h1 className="hero-title">
            Welcome back, <span className="hero-name">{user.name}</span>!
          </h1>
          <p style={{ color: '#64748b' }}>Here is what’s happening in your community today.</p>
          
          <div className="badges-container">
            <span className="badge badge-role">{user.role}</span>
            <span className="badge badge-branch">{user.branch} Department</span>
          </div>
        </div>

        {/* ALUMNI SPECIAL BANNER */}
        {user.role === 'Alumni' && (
          <div className="alumni-banner">
            <div style={{ fontSize: '24px' }}>🎓</div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '4px' }}>Alumni Privileges Active</h3>
              <p style={{ fontSize: '14px', margin: 0 }}>You have access to post jobs and organize mentorship sessions.</p>
            </div>
          </div>
        )}

        {/* FEATURES GRID */}
        <div className="dashboard-grid">
          
          {/* JOBS CARD */}
          <div className="feature-card" onClick={() => navigate("/jobs")}>
            <div className="card-icon icon-jobs">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
            </div>
            <div className="card-title">Browse Jobs</div>
            <p className="card-desc">Explore career opportunities or post new openings for juniors.</p>
            <div className="arrow-icon">Explore &rarr;</div>
          </div>

          {/* CHAT CARD */}
          <div className="feature-card" onClick={() => navigate("/chat")}>
            <div className="card-icon icon-chat">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            </div>
            <div className="card-title">Community Chat</div>
            <p className="card-desc">Join the conversation with students and alumni in real-time.</p>
            <div className="arrow-icon">Connect &rarr;</div>
          </div>

          {/* NETWORK CARD */}
          <div className="feature-card" onClick={() => navigate("/network")}>
            <div className="card-icon icon-network">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            </div>
            <div className="card-title">My Network</div>
            <p className="card-desc">Expand your professional connections within the university.</p>
            <div className="arrow-icon">Grow &rarr;</div>
          </div>

          {/* EVENTS CARD */}
          <div className="feature-card" onClick={() => navigate("/events")}>
            <div className="card-icon icon-events">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
            <div className="card-title">Events & Reunions</div>
            <p className="card-desc">Stay updated on upcoming meetups, webinars, and college reunions.</p>
            <div className="arrow-icon">View Calendar &rarr;</div>
          </div>

        </div>
      </div>
    </div>
  );
}