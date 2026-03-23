const Notification = require("../models/Notification");
const Post = require("../models/Post");

// Create a Post
const createPost = async (req, res) => {
  try {
    const { text } = req.body;

    const post = new Post({
      user: req.user.id,
      text,
    });

    await post.save();

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Getting all Posts for Feed
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", ["name"])
      .populate("comments.user", ["name"])
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like System for Posts
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const alreadyLiked = post.likes.find(
      (like) => like.user.toString() === req.user.id,
    );

    if (alreadyLiked) {
      post.likes = post.likes.filter(
        (like) => like.user.toString() !== req.user.id,
      );
    } else {
      post.likes.unshift({ user: req.user.id });

      // Create notification for post owner
      if (post.user.toString() != req.user.id) {
        await Notification.create({
          recipient: post.user,
          sender: req.user.id,
          type: "like",
          post: post._id,
        });
      }
    }

    await post.save();

    res.json(post.likes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comment System for Posts
const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const newComment = {
      user: req.user.id,
      text: req.body.text,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPost, getPosts, likePost, addComment };
