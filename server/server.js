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
const jobRoutes = require("./routes/jobRoutes");

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

const onLineUsers = {};

// Socket connection
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Register User when they connect
    socket.on("registerUser", (userId) => {
        onLineUsers[userId] = socket.id;

        console.log("Online Users: ", onlineUsers);
    })

    // Listen for message event and send message to specific user
    socket.on("sendMessage", (data) => {
        const receiverSocket = onlineUsers[data.reciever];

        if(receiverSocket) {
            io.to(receiverSocket).emit("receiveMessage", data);
        }
    });

    // Remove user when they disconnect
    socket.on("disconnect", () => {

        for (let userId in onLineUsers) {
            if (onlineUsers[userId] === socket.id) {
                delete onlineUsers[userId];
            }
        }
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
app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
    res.send("DevConnectttt Babyyy...");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running at PORT:${PORT}...`);
});