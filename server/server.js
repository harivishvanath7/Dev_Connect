const express = require("express");
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");
const { Server } = require("socket.io");

// API Routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const followRoutes = require("./routes/followRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

require("dotenv").config();

const app = express();
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Attach Socket.io 
const io = new Server(server, { 
    cors: { 
        origin: "*"
    } 
});

// Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for message event
    socket.on("sendMessage", (data) => {
        io.emit("receiveMessage", data);
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });

});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", followRoutes);
app.use("/api/notifications", notificationRoutes);

app.get("/", (req, res) => {
    res.send("DevConnectttt Babyyy...");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running at PORT:${PORT}...`);
});