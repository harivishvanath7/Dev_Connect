const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { createProfile, updateProfile, getProfiles, getProfileByUser, searchDevelopers } = require("../controllers/profileController");

router.get("/", getProfiles);
router.get("/:userId", getProfileByUser);
router.get("/search/skill", searchDevelopers);

// Protected Routes
router.post("/", authMiddleware, createProfile);
router.put("/", authMiddleware, updateProfile);

module.exports = router;
