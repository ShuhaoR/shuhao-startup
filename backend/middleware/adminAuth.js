const jwt = require("jsonwebtoken");

// Middleware to protect admin routes
const adminAuth = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "your_jwt_secret");
    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = adminAuth;
