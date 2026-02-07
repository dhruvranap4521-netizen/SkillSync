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

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Set BOTH id and _id for compatibility
    req.user = { id: decoded.id, _id: decoded.id }; 
    
    next();
  } catch (err) {
    res.status(401).json({ success: false, message: "Token is not valid" });
  }
};

module.exports = { protect };