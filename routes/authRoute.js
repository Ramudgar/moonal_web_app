const { register, login } = require("../controllers/authController");

const express = require("express");
const router = express.Router();

// Register a new user - /api/v1/auth/register

router.post("/register", register);

// Login a user - /api/v1/auth/login
router.post("/login", login);

module.exports = router;

