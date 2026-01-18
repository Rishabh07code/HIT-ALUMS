// Filename: backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const authRoute = require("./routes/auth");
const jobsRoute = require("./routes/jobs");
const eventsRoute = require("./routes/events");
const networkRoute = require("./routes/network");

dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/auth", authRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/events", eventsRoute);
app.use("/api/auth", authRoute);
app.use("/api/jobs", jobsRoute);
app.use("/api/events", eventsRoute);
app.use("/api/network", networkRoute);

// --- MAIN CHANGE YAHAN HAI ---
const io = new Server(server, {
  cors: {
    origin: "*", // Sab kuch allow kar diya
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`); // <--- Ye check karna terminal me

  socket.on("send_message", (data) => {
    // Message aaya, ab sabko wapas bhejo
    io.emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server & Socket running on port ${PORT}`);
});