// Show routes
// Handles fetching show data with optional filtering
// Public routes - no authentication required

const express = require('express');
const router = express.Router();
const showsController = require('../controllers/showsController');

// Returns all shows
router.get('/', showsController.getAllShows);
// Returns a single show by its ID
router.get('/:id', showsController.getShowById);

module.exports = router;