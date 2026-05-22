// Showtime routes
// Handles fetching available dates and times for a specific show
// Public route - no authentication required

const express = require('express');
const router = express.Router();
const showtimesController = require('../controllers/showtimesController');

// Returns all showtimes for a specific show
router.get('/', showtimesController.getShowtimes);

module.exports = router;