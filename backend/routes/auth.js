// Authentication routes
// Handles user registration and login
// These routes are public - no JWT token required

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Create a new user account
router.post('/register', authController.register);
// Login and receive a JWT token
router.post('/login', authController.login);

module.exports = router;