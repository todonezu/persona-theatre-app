// Seats Controller
// Contains the logic for fetching seat availability for a specific showtime
// Uses a LEFT JOIN with reservations to determine which seats are taken

const db = require('../db');

// Get seats for a specific showtime
exports.getSeats = async (req, res) => {
  try {
    const { showtimeId } = req.query;

    if (!showtimeId) return res.status(400).json({ error: 'showtimeId is required' });

    const [rows] = await db.query(`
      SELECT seats.*, 
      CASE WHEN reservations.seat_id IS NOT NULL 
      THEN FALSE ELSE TRUE END as is_available
      FROM seats
      LEFT JOIN reservations ON seats.seat_id = reservations.seat_id
      AND reservations.status = 'active'
      WHERE seats.showtime_id = ?
      ORDER BY seats.category, seats.seat_number ASC
    `, [showtimeId]);

    if (rows.length === 0) return res.status(404).json({ error: 'No seats found for this showtime' });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};