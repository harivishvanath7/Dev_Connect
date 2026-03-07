const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { getGithubProfile, getGithubRepos, getGithubStats } = require("../controllers/githubController");

router.get("/", authMiddleware, getGithubProfile);
router.get("/repos", authMiddleware, getGithubRepos);
router.get("/stats", authMiddleware, getGithubStats);

module.exports = router;