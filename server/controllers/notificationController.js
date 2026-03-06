const Notification = require("../models/Notification");

// Get Notifications for Logged in User
const getNotifications = async(req, res) => {
    try {
        const notifications = await Notification.find({
            recipient: req.user.id
        })
        .populate("sender", ["name"])
        .sort({ createdAt: -1 });

        res.status(200).json(notifications);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mark notification as read
const markAsRead = async(req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        // Security check
        if (notification.recipient.toString() !== req.user.id) {
            return res.status(403).json({
                message: "Not authorized."
            });
        }

        notification.isRead = true;

        await notification.save();

        res.json({
            message: "Notification marked as read."
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get unread notification count
const getUnreadCount = async(req, res) => {
    try {

        const count = await Notification.countDocuments({
            recipient: req.user.id,
            isRead: false
        });

        res.status(200).json({
            unreadCount: count
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = { getNotifications, markAsRead, getUnreadCount };