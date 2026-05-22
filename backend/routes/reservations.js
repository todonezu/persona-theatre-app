// Reservation routes
// Handles creating, viewing and cancelling bookings
// All routes are protected - valid JWT token required

const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');
const authMiddleware = require('../middleware/auth');

// Create a new reservation
router.post('/', authMiddleware, reservationsController.createReservation);
// Get all reservations for the logged in user
router.get('/user', authMiddleware, reservationsController.getUserReservations);
// Cancel a reservation by ID 
router.delete('/:id', authMiddleware, reservationsController.cancelReservation);

module.exports = router;