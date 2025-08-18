const db = require('../models/db');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reviews');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get review by ID
exports.getReviewById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Review not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};
