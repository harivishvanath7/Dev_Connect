const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const postRoutes = require("./routes/postRoutes");
const followRoutes = require("./routes/followRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

require("dotenv").config();

const app = express();
connectDB();


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

app.listen(PORT, (req, res) => {
    console.log(`App running at PORT:${PORT}...`);
});