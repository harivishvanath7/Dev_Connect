const Job = require("../models/Job");

// Create a Job
const createJob = async(req, res) => {
    try {
        console.log(req.body);
        const {title, company, description, location, skills, salary } = req.body;

        const job = new Job({
            title,
            company,
            description,
            location,
            skills,
            salary,
            postedBy: req.user.id
        });

        await job.save();

        res.status(201).json(job);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Apply for a Job
const applyJob = async(req, res) => {
    try {
        const job = await Job.findById(req.params.id);

        if(!job) {
            return res.status(404).json({
                message: "Job not found"
            });
        }

        // Check if already applied
        const alreadyApplied = job.applicants.find(
            applicant => applicant.user.toString() === req.user.id
        );

        if(alreadyApplied) {
            return res.status(400).json({
                message: "You already applied for this job."
            });
        }

        job.applicants.unshift({
            user: req.user.id
        });

        await job.save();

        res.status(200).json({
            message: "Applied Successfully."
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search Jobs
const searchJobs = async(req, res) => {
    try {

        const { skill, location, company } = req.query;

        let filter = {};

        if (skill) {
            filter.skills = { $regex: skill, $options: "i" };
        }

        if (location) {
            filter.location = { $regex: location, $options: "i" };
        }

        if (company) {
            filter.company = { $regex: company, $options: "i" };
        }

        const jobs = await Job.find(filter).populate("postedBy", ["name"]).sort({ createdAt: -1 });

        res.json(jobs);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = { createJob, applyJob, searchJobs };