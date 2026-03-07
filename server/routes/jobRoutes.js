const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createJob, applyJob, searchJobs } = require("../controllers/jobController");

router.get("/search", searchJobs);

// Protected Routes
router.post("/", authMiddleware, createJob);
router.post("/:id/apply", authMiddleware, applyJob);

module.exports = router;