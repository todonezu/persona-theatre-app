// Theatre routes
// Handles fetching theatre data
// Public route - no authentication required

const express = require('express');
const router = express.Router();
const theatresController = require('../controllers/theatresController');

// Returns list of all theatres
router.get('/', theatresController.getAllTheatres);

module.exports = router;