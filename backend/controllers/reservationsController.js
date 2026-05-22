// Reservations Controller
// Contains the logic for creating, viewing and cancelling reservations
// All functions require authentication (handled by middleware/auth.js)

const db = require('../db');

// Create reservation
exports.createReservation = async (req, res) => {
  const { seat_id } = req.body;
  const user_id = req.user.user_id;

  try {
    // Check if seat is already reserved
    const [existing] = await db.query(`
      SELECT * FROM reservations 
      WHERE seat_id = ? AND status = 'active'
    `, [seat_id]);

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Seat is already reserved' });
    }

    // Create the reservation
    const [result] = await db.query(`
      INSERT INTO reservations (user_id, seat_id, status) 
      VALUES (?, ?, 'active')
    `, [user_id, seat_id]);

    // Mark seat as unavailable
    await db.query(`
      UPDATE seats SET is_available = FALSE WHERE seat_id = ?
    `, [seat_id]);

    res.status(201).json({ 
      message: 'Reservation created successfully',
      reservation_id: result.insertId 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get user reservations
exports.getUserReservations = async (req, res) => {
  const user_id = req.user.user_id;

  try {
    const [rows] = await db.query(`
      SELECT reservations.*, 
      seats.seat_number, seats.category, seats.price,
      shows.title as show_title, shows.duration,
      showtimes.show_datetime,
      theatres.name as theatre_name, theatres.location
      FROM reservations
      JOIN seats ON reservations.seat_id = seats.seat_id
      JOIN showtimes ON seats.showtime_id = showtimes.showtime_id
      JOIN shows ON showtimes.show_id = shows.show_id
      JOIN theatres ON shows.theatre_id = theatres.theatre_id
      WHERE reservations.user_id = ?
      ORDER BY showtimes.show_datetime ASC
    `, [user_id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Cancel reservation
exports.cancelReservation = async (req, res) => {
  const reservation_id = req.params.id;
  const user_id = req.user.user_id;

  try {
    // Check reservation belongs to this user
    const [rows] = await db.query(`
      SELECT * FROM reservations 
      WHERE reservation_id = ? AND user_id = ?
    `, [reservation_id, user_id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Reservation not found' });
    }

    // Cancel the reservation
    await db.query(`
      UPDATE reservations SET status = 'cancelled' 
      WHERE reservation_id = ?
    `, [reservation_id]);

    // Mark seat as available again
    await db.query(`
      UPDATE seats SET is_available = TRUE 
      WHERE seat_id = ?
    `, [rows[0].seat_id]);

    res.json({ message: 'Reservation cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};