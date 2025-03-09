const User = require('../models/User');
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "1h"});
}

exports.registerUser = async (req, res) => {
    const { fullName, email, password } = req.body;
    if( !fullName || !email || !password) {
        return res.status(400).json({ message : "All fields are require"})
    };

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "Email already exists"});
        }

        const user = await User.create({
            fullName,
            email,
            password
        });

        res.status(201).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (err) {
        console.error("Error in register ", err);
        res.status(500).json({ message: "Error in register user", error: err.message})
    }
};


exports.loginUser = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        return res.status(400).json({ message: "All fields are required"});
    }
    try {
        const user = await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))) {
            return res.status(400).json({ message: "Invalid credentials"});
        }

        res.status(200).json({
            id: user._id,
            user,
            token: generateToken(user._id)
        })
    } catch (err) {
        console.error("Error in login ", err);
        res.status(500).json({ message: "Error in user login", error: err.message})
    }

   
};


exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if(!user) {
            return res.status(404).json({ message: "User not found"});
        }
        res.status(200).json(user)
    } catch (err) {
        console.error("Error in getUserInfo ", err);
        res.status(500).json({ message: "Error in getUserInfo", error: err.message})
    }
}; 