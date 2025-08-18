const db = require('../models/db');
const bcrypt = require('bcryptjs');

// Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT user_id, name, email, contact, role FROM users'
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get user by ID (admin or self)
exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.query(
      'SELECT user_id, name, email, contact, role FROM users WHERE user_id = ?',
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Create new user (admin only)
exports.createUser = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;

    if (!password) return res.status(400).json({ error: 'Password is required' });
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, contact, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, hashedPassword, contact || null, role || 'guest']
    );
    res.status(201).json({ user_id: result.insertId, name, email, contact, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert error' });
  }
};

// Update user (admin or self)
exports.updateUser = async (req, res) => {
  try {
    const { name, email, password, contact, role } = req.body;

    let query = 'UPDATE users SET name = ?, email = ?, contact = ?, role = ?';
    let params = [name, email, contact || null, role || 'guest'];

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      query += ', password = ?';
      params.push(hashedPassword);
    }

    query += ' WHERE user_id = ?';
    params.push(req.params.id);

    const [result] = await db.query(query, params);

    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ user_id: req.params.id, name, email, contact, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database update error' });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM users WHERE user_id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database delete error' });
  }
};




// const db = require('../models/db');

// exports.getAllUsers = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM users');
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database query error' });
//   }
// };
