// Main entry point of the backend server
// Sets up Express, middleware, and connects all routes

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/auth');
const theatreRoutes = require('./routes/theatres');
const showRoutes = require('./routes/shows');
const showtimeRoutes = require('./routes/showtimes');
const seatRoutes = require('./routes/seats');
const reservationRoutes = require('./routes/reservations');

// Register Routes

app.use('/auth', authRoutes);
app.use('/theatres', theatreRoutes);
app.use('/shows', showRoutes);
app.use('/showtimes', showtimeRoutes);
app.use('/seats', seatRoutes);
app.use('/reservations', reservationRoutes);

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});