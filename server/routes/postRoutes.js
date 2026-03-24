const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const { createPost, getPosts, likePost, addComment, getFeed } = require("../controllers/postController");


// Protected Routes
router.get("/", authMiddleware, getPosts);
router.post("/", authMiddleware, createPost);
router.post("/like/:id", authMiddleware, likePost);
router.post("/comment/:id", authMiddleware, addComment);

// Get Feed
router.get("/feed", authMiddleware, getFeed);

module.exports = router;

