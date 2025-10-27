const express = require("express");
const router = express.Router();
const apiLogger = require("../middleware/apiLogger");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

//route
router.use(authenticateToken, apiLogger, authorizeRole(2));

// router.use(apiLogger);

router.get("/position", userController.position);
router.get("/role", userController.role);
router.get("/user", userController.index);
router.get("/viewUser/:id", userController.view_by_id);
router.post("/addUser", userController.addUser);
router.put("/editUser/:id", userController.editUser);

module.exports = router;
