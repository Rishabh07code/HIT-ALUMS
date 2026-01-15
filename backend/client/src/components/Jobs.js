// Filename: client/src/components/Jobs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // <-- 1. Import kiya

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // <-- 2. Navigate hook
  
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
      navigate("/login"); // Agar login nahi hai to bhaga do
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

  // --- 3. Logout Function ---
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      
      {/* --- New Navigation Header --- */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <button onClick={() => navigate("/dashboard")} style={{ ...btnStyle, background: '#6c757d' }}>
          ⬅ Back to Dashboard
        </button>
        <button onClick={handleLogout} style={{ ...btnStyle, background: '#dc3545' }}>
          Logout 🚪
        </button>
      </div>

      <h2 style={{ textAlign: 'center' }}>🎓 Career Portal</h2>

      {/* --- Alumni Section --- */}
      {user && user.role === 'Alumni' && (
        <div style={{ background: '#f4f4f4', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>📢 Post a New Job</h3>
          <form onSubmit={handlePostJob} style={{ display: 'grid', gap: '10px' }}>
            <input placeholder="Company Name" value={newJob.companyName} onChange={(e)=>setNewJob({...newJob, companyName:e.target.value})} required style={inputStyle}/>
            <input placeholder="Position (e.g. SDE-1)" value={newJob.position} onChange={(e)=>setNewJob({...newJob, position:e.target.value})} required style={inputStyle}/>
            <input placeholder="Location" value={newJob.location} onChange={(e)=>setNewJob({...newJob, location:e.target.value})} required style={inputStyle}/>
            <textarea placeholder="Job Description" value={newJob.description} onChange={(e)=>setNewJob({...newJob, description:e.target.value})} required style={{...inputStyle, height:'60px'}}/>
            <button type="submit" style={btnStyle}>Post Job</button>
          </form>
        </div>
      )}

      {/* --- Job List --- */}
      <h3>🔥 Latest Openings</h3>
      {jobs.length === 0 ? <p>No jobs available yet.</p> : (
        <div>
          {jobs.map((job) => (
            <div key={job._id} style={cardStyle}>
              <h3 style={{ margin: '0 0 5px 0', color: '#007bff' }}>{job.position}</h3>
              <h4 style={{ margin: '0', color: '#555' }}>@ {job.companyName}</h4>
              <p style={{ fontStyle: 'italic', color: 'gray' }}>📍 {job.location} | Posted by: {job.postedBy}</p>
              <p>{job.description}</p>
              <button style={{...btnStyle, background:'#28a745'}}>Apply Now</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', borderRadius:'4px' };
const cardStyle = { border: '1px solid #ddd', padding: '15px', borderRadius: '8px', marginBottom: '15px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };