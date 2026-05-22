// Theatres Controller
// Contains the logic for fetching theatre data from the database

const db = require('../db');

// Get all theatres
exports.getAllTheatres = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM theatres');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};