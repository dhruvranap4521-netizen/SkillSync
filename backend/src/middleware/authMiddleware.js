const jwt = require('jsonwebtoken');
require('dotenv').config()
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }
    
    console.log("Full Auth Header:", req.headers.authorization);
    console.log("Extracted Token:", token);


    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Create the req.user object that your controller is looking for
    req.user = { id: decoded.id }; 
    
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

module.exports = { protect };