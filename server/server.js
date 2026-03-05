const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
connectDB();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("DevConnectttt Babyyy...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, (req, res) => {
    console.log(`App running at PORT:${PORT}...`);
});