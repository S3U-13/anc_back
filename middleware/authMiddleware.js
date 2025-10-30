// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

// ตรวจสอบ token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) return res.status(401).json({ error: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET || "secretkey", (err, user) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(403).json({ error: "Token expired" });
      } else {
        return res.status(403).json({ error: "Invalid token" });
      }
    }

    req.user = user; // { id, role_id }
    next();
  });
}

// ตรวจสอบ role
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role_id !== role)
      return res.status(403).json({ error: "Access denied" });
    next();
  };
}

module.exports = { authenticateToken, authorizeRole };
