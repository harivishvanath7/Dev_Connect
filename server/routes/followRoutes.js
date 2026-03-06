const express = require("express");
const router = express.Router();

const authMiddleWare = require("../middleware/authMiddleware");
const { followUser, unfollowUser, getFollowers, getFollowing } = require("../controllers/followController");


router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

// Protected Routes
router.post("/follow/:id", authMiddleWare, followUser);
router.post("/unfollow/:id", authMiddleWare, unfollowUser);

module.exports = router;