// Filename: client/src/components/Events.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    location: "",
    description: ""
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser).user);
    } else {
      navigate("/login");
    }
    fetchEvents();
  }, [navigate]);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events/all");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handlePostEvent = async (e) => {
    e.preventDefault();
    try {
      const eventData = { ...newEvent, postedBy: user.name };
      await axios.post("http://localhost:5000/api/events/add", eventData);
      alert("Event Created Successfully!");
      fetchEvents();
      setNewEvent({ title: "", date: "", location: "", description: "" });
    } catch (err) {
      alert("Error creating event");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom:'20px', padding:'5px 10px' }}>⬅ Back</button>
      
      <h2 style={{ textAlign: 'center' }}>📅 College Events & Reunions</h2>

      {/* --- Alumni Form --- */}
      {user && user.role === 'Alumni' && (
        <div style={{ background: '#e3f2fd', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3>➕ Organize an Event</h3>
          <form onSubmit={handlePostEvent} style={{ display: 'grid', gap: '10px' }}>
            <input placeholder="Event Title (e.g. Batch 2022 Reunion)" value={newEvent.title} onChange={(e)=>setNewEvent({...newEvent, title:e.target.value})} required style={inputStyle}/>
            <input type="date" value={newEvent.date} onChange={(e)=>setNewEvent({...newEvent, date:e.target.value})} required style={inputStyle}/>
            <input placeholder="Location (e.g. College Auditorium)" value={newEvent.location} onChange={(e)=>setNewEvent({...newEvent, location:e.target.value})} required style={inputStyle}/>
            <textarea placeholder="Event Details..." value={newEvent.description} onChange={(e)=>setNewEvent({...newEvent, description:e.target.value})} required style={{...inputStyle, height:'60px'}}/>
            <button type="submit" style={btnStyle}>Create Event</button>
          </form>
        </div>
      )}

      {/* --- Events List --- */}
      {events.length === 0 ? <p>No upcoming events.</p> : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {events.map((evt) => (
            <div key={evt._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', background: '#fff' }}>
              <h3 style={{ margin: '0 0 5px 0', color: '#d63384' }}>{evt.title}</h3>
              <p style={{ fontWeight: 'bold', margin: '5px 0' }}>📅 {evt.date} | 📍 {evt.location}</p>
              <p>{evt.description}</p>
              <small style={{ color: 'gray' }}>Organized by: {evt.postedBy}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
const btnStyle = { padding: '10px', background: '#d63384', color: 'white', border: 'none', cursor: 'pointer', borderRadius:'4px' };