const db = require('../models/db');

// Get all rooms
exports.getAllRooms = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rooms');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get room by ID
exports.getRoomById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rooms WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Room not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Create new room
exports.createRoom = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const [result] = await db.query(
      'INSERT INTO rooms (name, capacity) VALUES (?, ?)',
      [name, capacity]
    );
    res.status(201).json({ id: result.insertId, name, capacity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert error' });
  }
};

// Update room
exports.updateRoom = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const [result] = await db.query(
      'UPDATE rooms SET name = ?, capacity = ? WHERE id = ?',
      [name, capacity, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Room not found' });
    res.json({ id: req.params.id, name, capacity });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database update error' });
  }
};

// Delete room
exports.deleteRoom = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM rooms WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Room not found' });
    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database delete error' });
  }
};



// const db = require('../models/db');

// exports.getAllrooms = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM rooms');
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database query error' });
//   }
// };
