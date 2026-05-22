// Showtimes Controller
// Contains the logic for fetching available showtimes for a specific show

const db = require('../db');

// Get showtimes for a specific show
exports.getShowtimes = async (req, res) => {
  try {
    const { showId } = req.query;

    if (!showId) return res.status(400).json({ error: 'showId is required' });

    const [rows] = await db.query(`
      SELECT showtimes.*, shows.title, shows.duration, shows.age_rating,
      theatres.name as theatre_name, theatres.location
      FROM showtimes
      JOIN shows ON showtimes.show_id = shows.show_id
      JOIN theatres ON shows.theatre_id = theatres.theatre_id
      WHERE showtimes.show_id = ?
      ORDER BY showtimes.show_datetime ASC
    `, [showId]);

    if (rows.length === 0) return res.status(404).json({ error: 'No showtimes found for this show' });
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};