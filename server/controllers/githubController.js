const axios = require("axios");
const User = require("../models/User");

// Fetch Github Profile
const getGithubProfile = async(req, res) => {
    try {
        // Get logged in user
        const user = await User.findById(req.user.id);

        if (!user.github) {
            return res.status(400).json({
                message: "Github username not added to profile."
            });
        }

        // Call Github API
        const response = await axios.get(
            `https://api.github.com/users/${user.github}`
        );

        const githubData = {
            username: response.data.login,
            avatar: response.data.avatar_url,
            bio: response.data.bio,
            followers: response.data.followers,
            following: response.data.following,
            publicRepos: response.data.public_repos,
            profileUrl: response.data.html_url
        };

        res.json(githubData);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch Github profile."
        });
    }
};

// Fetch Github Repositories
const getGithubRepos = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user.github) {
            return res.status(400).json({
                message: "Github username not added"
            });
        }

        const response = response.data.map(repo => ({
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            language: repo.language,
            repoUrl: repo.html_url
        }));

        res.json(repos);

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch repositories."
        });
    }
};

// Show Github Stats

const getGithubStats = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if(!user.github) {
            return res.status(400).json({
                message: "Github username not added."
            });
        }

        const response = await axios.get(
            `https://api.github.com/users/${user.github}/repos`
        );

        const repos = response.data;

        let totalStars = 0;
        let languages = {};

        repos.forEach(repo => {
            // Count stars
            totalStars += repo.stargazers_count;

            // Count languages
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });

        // Find most used language
        let topLanguage = null;
        let max = 0;

        for (let lang in languages) {
            if (languages[lang] > max) {
                max = languages[lang];
                topLanguage = lang;
            }
        }

        res.json({
            totalRepos: repos.length,
            totalStars,
            topLanguage
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch Github stats."
        });
    }
};

module.exports = { getGithubProfile, getGithubRepos, getGithubStats };