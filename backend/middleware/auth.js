// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const token = authHeader && authHeader.split(' ')[1]; // Extract the token from the header
  if (!token) {
    return res.status(401).json({ message: 'Token is missing or malformed' });
  }

  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: 'Invalid token' });
  }
}

module.exports = authMiddleware;

