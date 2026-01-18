// Filename: client/src/components/Jobs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  
  const [newJob, setNewJob] = useState({
    companyName: "",
    position: "",
    description: "",
    location: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser).user);
    } else {
      navigate("/login"); 
    }
    fetchJobs();
  }, [navigate]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/all");
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      const jobData = { ...newJob, postedBy: user.name };
      await axios.post("http://localhost:5000/api/jobs/add", jobData);
      alert("Job Posted Successfully!");
      fetchJobs();
      setNewJob({ companyName: "", position: "", description: "", location: "" });
    } catch (err) {
      alert("Error posting job");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

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
            --success: #10b981;
            --danger: #ef4444;
          }

          * {
            box-sizing: border-box;
            font-family: 'Plus Jakarta Sans', sans-serif;
            margin: 0;
            padding: 0;
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
          }

          .nav-brand {
            font-weight: 800;
            font-size: 20px;
            color: var(--primary);
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
          }

          .nav-right {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .nav-btn {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
            border: 1px solid transparent;
          }

          .btn-back {
            background: transparent;
            color: var(--text-muted);
          }
          .btn-back:hover { color: var(--text-main); background: #f1f5f9; }

          .btn-logout {
            background: #fef2f2;
            color: var(--danger);
            border-color: #fecaca;
          }
          .btn-logout:hover { background: #fee2e2; }

          /* --- MAIN CONTAINER --- */
          .main-container {
            max-width: 1000px;
            margin: 40px auto;
            padding: 0 20px;
          }

          .page-header {
            text-align: center;
            margin-bottom: 40px;
          }

          .page-title {
            font-size: 32px;
            font-weight: 800;
            margin-bottom: 10px;
            color: var(--text-main);
          }

          .page-subtitle {
            color: var(--text-muted);
            font-size: 16px;
          }

          /* --- ALUMNI POST SECTION --- */
          .post-job-card {
            background: white;
            border: 1px solid var(--primary);
            border-radius: 12px;
            padding: 24px;
            margin-bottom: 40px;
            box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
            position: relative;
            overflow: hidden;
          }

          .post-job-card::before {
            content: "";
            position: absolute;
            top: 0; left: 0; width: 4px; height: 100%;
            background: var(--primary);
          }

          .form-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 20px;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .job-form {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
          }

          .form-full { grid-column: span 2; }

          .input-field, .textarea-field {
            width: 100%;
            padding: 12px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 14px;
            transition: all 0.2s;
            outline: none;
          }

          .input-field:focus, .textarea-field:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
          }

          .textarea-field { resize: vertical; min-height: 80px; }

          .btn-submit {
            grid-column: span 2;
            background: var(--primary);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            margin-top: 10px;
          }
          .btn-submit:hover { background: var(--primary-hover); }

          /* --- JOB LIST --- */
          .section-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--border);
            color: var(--text-main);
          }

          .jobs-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
          }

          .job-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 24px;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            flex-direction: column;
            gap: 12px;
            position: relative;
          }

          .job-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 20px -8px rgba(0, 0, 0, 0.1);
            border-color: var(--primary);
          }

          .job-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
          }

          .job-role {
            font-size: 18px;
            font-weight: 700;
            color: var(--text-main);
            margin-bottom: 4px;
          }

          .job-company {
            font-size: 14px;
            color: var(--primary);
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .job-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            font-size: 13px;
            color: var(--text-muted);
            margin-top: 5px;
          }

          .meta-item {
            display: flex;
            align-items: center;
            gap: 4px;
            background: #f1f5f9;
            padding: 4px 8px;
            border-radius: 4px;
          }

          .job-desc {
            font-size: 14px;
            color: #475569;
            line-height: 1.5;
            margin: 10px 0;
            flex-grow: 1; /* Pushes button to bottom */
          }

          .btn-apply {
            width: 100%;
            padding: 10px;
            background: white;
            color: var(--success);
            border: 1px solid var(--success);
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
            text-align: center;
          }

          .btn-apply:hover {
            background: var(--success);
            color: white;
          }

          .empty-state {
            text-align: center;
            padding: 40px;
            color: var(--text-muted);
            font-style: italic;
          }

          /* Mobile Tweaks */
          @media (max-width: 600px) {
            .job-form { grid-template-columns: 1fr; }
            .form-full { grid-column: span 1; }
            .btn-submit { grid-column: span 1; }
            .nav-brand span { display: none; }
          }
        `}
      </style>

      {/* --- NAVBAR --- */}
      <nav className="navbar">
        <div className="nav-brand" onClick={() => navigate("/dashboard")}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:'8px'}}>
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
          <span>Career Portal</span>
        </div>
        
        <div className="nav-right">
          <button onClick={() => navigate("/dashboard")} className="nav-btn btn-back">
            <span>←</span> Dashboard
          </button>
          <button onClick={handleLogout} className="nav-btn btn-logout">
            Logout 
          </button>
        </div>
      </nav>

      <div className="main-container">

        {/* --- HEADER --- */}
        <div className="page-header">
          <h2 className="page-title">Find Your Next Opportunity</h2>
          <p className="page-subtitle">Connect with top companies and alumni networks.</p>
        </div>

        {/* --- ALUMNI POST JOB SECTION --- */}
        {user && user.role === 'Alumni' && (
          <div className="post-job-card">
            <h3 className="form-title">
              <span>✨</span> Alumni Privilege: Post a Job
            </h3>
            <form onSubmit={handlePostJob} className="job-form">
              <input 
                className="input-field" 
                placeholder="Company Name" 
                value={newJob.companyName} 
                onChange={(e)=>setNewJob({...newJob, companyName:e.target.value})} 
                required 
              />
              <input 
                className="input-field" 
                placeholder="Position (e.g. SDE-1)" 
                value={newJob.position} 
                onChange={(e)=>setNewJob({...newJob, position:e.target.value})} 
                required 
              />
              <input 
                className="input-field form-full" 
                placeholder="Location (e.g. Bangalore, Remote)" 
                value={newJob.location} 
                onChange={(e)=>setNewJob({...newJob, location:e.target.value})} 
                required 
              />
              <textarea 
                className="textarea-field form-full" 
                placeholder="Job Description & Requirements..." 
                value={newJob.description} 
                onChange={(e)=>setNewJob({...newJob, description:e.target.value})} 
                required 
              />
              <button type="submit" className="btn-submit">🚀 Publish Opportunity</button>
            </form>
          </div>
        )}

        {/* --- JOBS GRID --- */}
        <h3 className="section-title">Latest Openings ({jobs.length})</h3>
        
        {jobs.length === 0 ? (
          <div className="empty-state">
            <p>No active job postings found. Check back later!</p>
          </div>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job._id} className="job-card">
                <div className="job-header">
                  <div>
                    <h3 className="job-role">{job.position}</h3>
                    <span className="job-company">{job.companyName}</span>
                  </div>
                </div>
                
                <div className="job-meta">
                  <span className="meta-item">
                    📍 {job.location}
                  </span>
                  <span className="meta-item">
                    👤 {job.postedBy}
                  </span>
                </div>

                <p className="job-desc">{job.description}</p>
                
                <button className="btn-apply">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}