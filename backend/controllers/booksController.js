const db = require('../models/db');

// Get all bookings
exports.getAllBooks = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get booking by ID
exports.getBookById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM bookings WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Create booking
exports.createBooking = async (req, res) => {
  try {
    const { user_id, room_id, start_date, end_date } = req.body;
    const [result] = await db.query(
      'INSERT INTO bookings (user_id, room_id, start_date, end_date) VALUES (?, ?, ?, ?)',
      [user_id, room_id, start_date, end_date]
    );
    res.status(201).json({ id: result.insertId, user_id, room_id, start_date, end_date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert error' });
  }
};

// Update booking
exports.updateBooking = async (req, res) => {
  try {
    const { user_id, room_id, start_date, end_date } = req.body;
    const [result] = await db.query(
      'UPDATE bookings SET user_id = ?, room_id = ?, start_date = ?, end_date = ? WHERE id = ?',
      [user_id, room_id, start_date, end_date, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json({ id: req.params.id, user_id, room_id, start_date, end_date });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database update error' });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Booking not found' });
    res.json({ message: 'Booking deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database delete error' });
  }
};



// const db = require('../models/db');

// // Get all books
// exports.getAllBooks = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM books');
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database query error' });
//   }
// };

// // Get book by ID
// exports.getBookById = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM books WHERE id = ?', [req.params.id]);
//     if (rows.length === 0) return res.status(404).json({ error: 'Book not found' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database query error' });
//   }
// };
