// Shows Controller
// Contains the logic for fetching show data from the database
// Supports filtering by theatre and title

const db = require('../db');

// Get all shows
exports.getAllShows = async (req, res) => {
  try {
    const { theatreId, title } = req.query;
    let query = `
      SELECT shows.*, theatres.name as theatre_name, theatres.location 
      FROM shows 
      JOIN theatres ON shows.theatre_id = theatres.theatre_id
      WHERE 1=1
    `;
    const params = [];

    if (theatreId) {
      query += ' AND shows.theatre_id = ?';
      params.push(theatreId);
    }
    if (title) {
      query += ' AND shows.title LIKE ?';
      params.push(`%${title}%`);
    }

    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get single show by id
exports.getShowById = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT shows.*, theatres.name as theatre_name, theatres.location 
      FROM shows 
      JOIN theatres ON shows.theatre_id = theatres.theatre_id
      WHERE shows.show_id = ?
    `, [req.params.id]);

    if (rows.length === 0) return res.status(404).json({ error: 'Show not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};