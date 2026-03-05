const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token, Access Denied."});
    }

    try {
        const decoded = jwt.verify(
            token.split(" ")[1], 
            process.env.JWT_SECRET
        );
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = protect;