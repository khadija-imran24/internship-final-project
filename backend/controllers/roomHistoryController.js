const db = require('../models/db');

// Get all room history
exports.getAllRoomHistory = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM room_history');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get room history by ID
exports.getRoomHistoryById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM room_history WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Record not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};
