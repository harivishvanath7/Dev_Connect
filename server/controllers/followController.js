const User = require("../models/User");

const followUser = async(req, res) => {

    try {
        const currUserId = req.user.id;
        const targetUserId = req.params.id;

        if (currUserId === targetUserId) {
            return res.status(400).json({
                message: "You cannot follow yourself"
            });
        }

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                message: "User Not found"
            });
        }

        if (currentUser.following.includes(targetUserId)) {
            return res.status(400).json({
                message: "Already Following"
            });
        }

        currentUser.following.push(targetUserId);
        targetUser.followers.push(currentUserId);

        await currentUser.save();
        await targetUser.save();

        // Notification for Following User
        await Notification.create({
            recipient: targetUserId,
            sender: currentUserId,
            type: "follow"
        });

        res.status(200).json({
            message: "User followed successfully"
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const unfollowUser = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const targetUserId = req.user.id;

        const currentUser = await User.findById(currentUserId);
        const targetUser = await User.findById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (!currentUser.following.includes(targetUserId)) {
            return res.status(400).json({
                message: "You are not following this user."
            });
        }

        await User.findByIdAndUpdate(
            currentUserId,
            { $pull: { following: targetUserId } }
        );

        res.status(200).json({
            message: "User unfollowed successfully."
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

const getFollowers = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("followers", "username bio github avatar");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json(user.followers);

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("following", "username bio github avatar");

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            })
        }

        res.status(200).json(user.following);

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = { followUser, unfollowUser, getFollowers, getFollowing };