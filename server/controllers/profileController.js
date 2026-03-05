const Profile = require("../models/Profile");

// Create Profile
const createProfile = async (req, res) => {
  try {
    const { bio, skills, company, location, website, github } = req.body;

    const profile = new Profile({
      user: req.user.id,
      bio,
      skills,
      company,
      location,
      website,
      github,
    });

    await profile.save();

    res.status(201).json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const profile = await Profile.findOneAndUpdate(
      { user: req.user.id },
      updates,
      { new: true },
    );

    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Profiles
const getProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "email"]);
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Profiles By User ID
const getProfileByUser = async (req, res) => {
    try {
        const profile = await Profile.findOne({user: req.params.userId}).populate("user", ["name"]);

        if(!profile) {
            return res.status(404).json({message: "Profile Not Found."});
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Search by skills
const searchDevelopers = async (req, res) => {
    try {
        const skill = req.query.skill;

        const profiles = await Profile.find({
            skills: {$regex: skill, $options: "i"}
        }).populate("user", ["name"]);

        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createProfile, updateProfile, getProfiles, getProfileByUser, searchDevelopers };
