const express = require("express");
const router = express.Router();

const { verifyToken } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const { addUser, loginUser } = require("../controllers/userController");

// Public
router.post("/login", loginUser);

// Admin only
router.post("/", verifyToken, authorizeRoles("Admin"), addUser);

module.exports = router;