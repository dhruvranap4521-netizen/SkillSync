const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config()

// HELPER: Keep secret consistent
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, skillsHave, skillsWant, bio, region } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({ 
      name, 
      email, 
      password: hashedPassword,
      skillsHave: skillsHave ? skillsHave.split(',').map(s => s.trim()) : [], 
      skillsWant: skillsWant ? skillsWant.split(',').map(s => s.trim()) : [],
      bio,
      region
    });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '10d' });

    newUser.password = undefined;
    res.status(201).json({ success: true, token, user: newUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const formatSkills = (skills) => {
  if (!skills) return [];
  if (Array.isArray(skills)) return skills;
  return skills.split(',')
    .map(s => s.trim())
    .filter(s => s !== ""); // Remove empty strings
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.user.id
    const { bio, skillsHave, skillsWant, region } = req.body;

    const updateData = {
      region,
      bio,
      skillsHave: formatSkills(skillsHave),
      skillsWant: formatSkills(skillsWant),
    };

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ success: false, message: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password" });
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '10d' });
    user.password = undefined;

    res.status(200).json({ success: true, token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// exports.getRecommendedMatches = async (req, res) => {
//     try {
//         const userId = req.user.id; 
//         const currentUser = await User.findById(userId);
//         if (!currentUser) return res.status(404).json({ message: "User not found" });

//         const matches = await User.find({
//             _id: { $ne: userId }, 
//             skillsHave: { $in: currentUser.skillsWant } 
//         }).limit(20).select("-password");

//         res.status(200).json(matches);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: err.message });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ success: false, message : err.message});
  }
};

exports.handleDeleteAccount = async (req, res) => {
  try {
    // The middleware ALREADY did the hard work of verifying the token
    // It put the result here: req.user.id
    const user = await User.findByIdAndDelete(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};