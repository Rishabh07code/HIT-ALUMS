// Filename: client/src/components/Network.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Network() {
  const [users, setUsers] = useState([]);
  const [myData, setMyData] = useState(null); // Mera khud ka status (requests etc.)
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("user"))?.user;

  useEffect(() => {
    if (!currentUser) navigate("/login");
    fetchNetwork();
  }, []);

  const fetchNetwork = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/network/users/${currentUser._id}`);
      setUsers(res.data.users);
      setMyData(res.data.myData);
    } catch (err) { console.error(err); }
  };

  // --- ACTIONS ---
  const sendRequest = async (receiverId) => {
    await axios.post("http://localhost:5000/api/network/send", { senderId: currentUser._id, receiverId });
    fetchNetwork(); // Refresh UI
  };

  const acceptRequest = async (requesterId) => {
    await axios.post("http://localhost:5000/api/network/accept", { userId: currentUser._id, requesterId });
    fetchNetwork();
  };

  const cancelOrReject = async (targetId) => {
    await axios.post("http://localhost:5000/api/network/reject", { userId: currentUser._id, targetId });
    fetchNetwork();
  };

  if (!myData) return <h3>Loading Network...</h3>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom:'20px', padding:'5px 10px' }}>⬅ Back</button>
      <h2 style={{ textAlign: 'center' }}>🌐 {currentUser.role === 'Student' ? 'Find Alumni' : 'Connect with Students'}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {users.map((user) => {
          // Check Status
          const isConnected = myData.connections.includes(user._id);
          const isSent = myData.sentRequests.includes(user._id);
          const isReceived = myData.receivedRequests.includes(user._id);

          return (
            <div key={user._id} style={cardStyle}>
              <h3>{user.name}</h3>
              <p style={{ color: 'gray' }}>{user.role} | {user.branch}</p>
              {user.company && <p>Works at: <b>{user.company}</b></p>}

              <div style={{ marginTop: '10px' }}>
                {isConnected ? (
                  <button style={{...btnStyle, background: 'green', cursor: 'default'}}>✅ Connected</button>
                ) : isSent ? (
                  <button onClick={() => cancelOrReject(user._id)} style={{...btnStyle, background: 'orange'}}>
                    🕒 Cancel Request
                  </button>
                ) : isReceived ? (
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button onClick={() => acceptRequest(user._id)} style={{...btnStyle, background: '#28a745', flex:1}}>Accept</button>
                    <button onClick={() => cancelOrReject(user._id)} style={{...btnStyle, background: '#dc3545', flex:1}}>Reject</button>
                  </div>
                ) : (
                  <button onClick={() => sendRequest(user._id)} style={btnStyle}>
                    ➕ Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const cardStyle = { padding: '15px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', textAlign: 'center' };
const btnStyle = { padding: '8px 12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%' };