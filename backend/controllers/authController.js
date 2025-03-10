const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
};

// Register User
exports.registerUser = async (req, res) => {};

// Login User
exports.loginUser = async (req, res) => {};

// GetUserInfo 
exports.getUserInfo = async (req, res) => {};
