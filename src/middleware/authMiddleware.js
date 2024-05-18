const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');

    if (!req.user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: 'Token is not valid' });
  }
};

module.exports = authenticateToken;
