const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: String,
            required: true
        },
        likes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
            }
        ],
        comments: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                text: {
                    type: String,
                    required: true
                },
                date: {
                    type: Date,
                    default: Date.now,
                },
            }
        ]
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;


