const Notification = require("../models/Notification");
const User = require("../models/User");

const followUser = async (req, res) => {
  try {
    const currUserId = req.user.id;
    const targetUserId = req.params.id;

    // Cannot follow yourself
    if (currUserId === targetUserId) {
      return res.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    // Fetch users
    const currentUser = await User.findById(currUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser) {
      return res.status(404).json({
        message: "Current user not found",
      });
    }

    if (!targetUser) {
      return res.status(404).json({
        message: "Target user not found",
      });
    }

    // Ensure arrays exist (for old DB data)
    if (!currentUser.following) currentUser.following = [];
    if (!targetUser.followers) targetUser.followers = [];

    // Already following check
    const alreadyFollowing = currentUser.following.find(
      (id) => id.toString() === targetUserId
    );

    if (alreadyFollowing) {
      return res.status(400).json({
        message: "Already Following",
      });
    }

    // Follow logic
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currUserId);

    await currentUser.save();
    await targetUser.save();

    // Notification (safe — won’t crash API)
    try {
      await Notification.create({
        recipient: targetUserId,
        sender: currUserId,
        type: "follow",
      });
    } catch (err) {
      console.log("Notification error:", err.message);
    }

    // SINGLE RESPONSE ONLY
    return res.status(200).json({
      message: "User followed successfully",
    });

  } catch (error) {
    console.log("FOLLOW ERROR:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.id;

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isFollowing = currentUser.following.find(
      (id) => id.toString() === targetUserId,
    );

    if (!isFollowing) {
      return res.status(400).json({
        message: "You are not following this user.",
      });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetUserId },
    });

    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUserId },
    });

    res.status(200).json({
      message: "User unfollowed successfully.",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getFollowers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "followers",
      "username bio github avatar",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user.followers);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getFollowing = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "following",
      "username bio github avatar",
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json(user.following);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };
