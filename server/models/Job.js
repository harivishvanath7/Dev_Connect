const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    skills: [
        {
            type: String
        }
    ],
    salary: {
        type: String
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    applicants: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            appliedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
