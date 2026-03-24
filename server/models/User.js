const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        bio: {
            type: String,
            default: ""
        },
        skills: {
            type: [String],
        },
        github: {
            type: String
        },
        avatar: {
            type: String,
            default: "",
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        ]
    },

    {timestamps: true}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;