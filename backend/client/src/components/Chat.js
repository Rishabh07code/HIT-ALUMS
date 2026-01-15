// Filename: client/src/components/Chat.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. User check
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(storedUser).user;
    setUser(parsedUser);

    // 2. Socket Connection
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);

    // 3. Messages suno
    newSocket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    return () => newSocket.close();
  }, [navigate]);

  const sendMessage = async () => {
    if (message !== "" && socket) {
      const messageData = {
        author: user.name,
        message: message,
        time: new Date().toLocaleTimeString(),
      };

      await socket.emit("send_message", messageData);
      setMessage(""); 
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <button onClick={() => navigate("/dashboard")} style={{ marginBottom:'10px', padding:'5px 10px', cursor:'pointer' }}>⬅ Back</button>
      
      <div style={{ border: '1px solid #ccc', borderRadius: '10px', overflow: 'hidden' }}>
        <div style={{ background: '#6f42c1', padding: '10px', color: 'white', textAlign: 'center' }}>
          <h3>💬 Community Chat</h3>
        </div>

        <div style={{ height: '300px', overflowY: 'scroll', padding: '10px', background: '#f9f9f9', display: 'flex', flexDirection: 'column' }}>
          {messageList.map((msg, index) => {
             const isMe = user && msg.author === user.name;
             return (
              <div key={index} style={{ textAlign: isMe ? 'right' : 'left', margin: '5px' }}>
                <div style={{ 
                  display: 'inline-block', 
                  padding: '8px 12px', 
                  borderRadius: '15px', 
                  background: isMe ? '#dcf8c6' : '#fff',
                  border: '1px solid #ddd'
                }}>
                  <p style={{ margin: 0, fontWeight: 'bold', fontSize: '12px', color: '#333' }}>{msg.author}</p>
                  <p style={{ margin: '2px 0' }}>{msg.message}</p>
                  <span style={{ fontSize: '10px', color: '#888' }}>{msg.time}</span>
                </div>
              </div>
             );
          })}
        </div>

        <div style={{ display: 'flex', padding: '10px', background: '#eee' }}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => {e.key === 'Enter' && sendMessage()}}
            style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <button onClick={sendMessage} style={{ marginLeft: '10px', padding: '10px 20px', background: '#6f42c1', color: 'white', border: 'none', borderRadius: '5px', cursor:'pointer' }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}