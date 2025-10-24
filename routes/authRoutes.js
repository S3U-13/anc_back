// routes/authRoutes.js
const express = require("express");
const router = express.Router();
// const apiLogger = require("../middleware/apiLogger");
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/authMiddleware");

// router.use(apiLogger);
router.post("/login", authController.login); // ✅ public route
router.post("/logout", authenticateToken, authController.logout); // ✅ ตรวจ token ก่อน
module.exports = router;
