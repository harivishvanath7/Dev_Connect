const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        bio: {
            type: String
        },
        skills: {
            type: [String]
        },
        company: {
            type: String
        },
        location: {
            type: String
        },
        website: {
            type: String
        },
        github: {
            type: String
        },
        experience: [
            {
                title: String,
                company: String,
                location: String,
                from: Date,
                to: Date,
                description: String            
            }
        ]
    }
);

const Profile = mongoose.model("Profile", ProfileSchema);

module.exports = Profile;
