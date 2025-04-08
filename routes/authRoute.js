const { register, login, getMe, logout } = require("../controllers/authController");

const express = require("express");
const protect = require("../middlewares/authMiddleware");
const router = express.Router();

// Register a new user - /api/v1/auth/register

router.post("/register", register);

// Login a user - /api/v1/auth/login
router.post("/login", login);

// Logout a user - /api/v1/auth/logout
router.post("/logout", logout);

// Persist user data - /api/v1/auth/me
router.get("/me", protect, getMe);

module.exports = router;

