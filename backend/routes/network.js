// Filename: backend/routes/network.js
const router = require("express").Router();
const User = require("../models/User");

// 1. Connection Request Bhejna
router.post("/send", async (req, res) => {
  const { senderId, receiverId } = req.body;
  try {
    // Sender ke 'sentRequests' me add karo
    await User.findByIdAndUpdate(senderId, { $addToSet: { sentRequests: receiverId } });
    // Receiver ke 'receivedRequests' me add karo
    await User.findByIdAndUpdate(receiverId, { $addToSet: { receivedRequests: senderId } });
    res.status(200).json({ message: "Request Sent" });
  } catch (err) { res.status(500).json(err); }
});

// 2. Request Accept karna
router.post("/accept", async (req, res) => {
  const { userId, requesterId } = req.body; // userId = jo accept kar raha hai
  try {
    // Dono ko 'connections' me daalo
    await User.findByIdAndUpdate(userId, { 
      $addToSet: { connections: requesterId },
      $pull: { receivedRequests: requesterId } // Request list se hatao
    });
    await User.findByIdAndUpdate(requesterId, { 
      $addToSet: { connections: userId },
      $pull: { sentRequests: userId } // Sent list se hatao
    });
    res.status(200).json({ message: "Request Accepted" });
  } catch (err) { res.status(500).json(err); }
});

// 3. Request Reject / Cancel karna
router.post("/reject", async (req, res) => {
  const { userId, targetId } = req.body;
  try {
    // Dono ki request lists saaf karo
    await User.findByIdAndUpdate(userId, { 
      $pull: { sentRequests: targetId, receivedRequests: targetId } 
    });
    await User.findByIdAndUpdate(targetId, { 
      $pull: { receivedRequests: userId, sentRequests: userId } 
    });
    res.status(200).json({ message: "Request Removed" });
  } catch (err) { res.status(500).json(err); }
});

// 4. Sare Users dikhana (Logic: Student ko Alumni dikhe, Alumni ko Student)
router.get("/users/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    if (!currentUser) return res.status(404).json("User not found");

    // Agar Student hai to Alumni dhundo, werna Student dhundo
    const targetRole = currentUser.role === 'Student' ? 'Alumni' : 'Student';
    
    // Sirf wo data bhejo jo zaroori hai (Password mat bhejo)
    const users = await User.find({ role: targetRole }).select("-password");
    
    // Current user ka taaza data bhi bhejo taaki button update ho sake
    const myData = await User.findById(req.params.userId).select("connections sentRequests receivedRequests");

    res.status(200).json({ users, myData });
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;