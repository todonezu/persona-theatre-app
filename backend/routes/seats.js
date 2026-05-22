// Seat routes
// Handles fetching seat availability for a specific showtime
// Public route - no authentication required

const express = require('express');
const router = express.Router();
const seatsController = require('../controllers/seatsController');

// Returns all seats for a specific showtime
router.get('/', seatsController.getSeats);

module.exports = router;