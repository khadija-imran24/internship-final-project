const db = require('../models/db');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Get employee by ID
exports.getEmployeeById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database query error' });
  }
};

// Create employee
exports.createEmployee = async (req, res) => {
  try {
    const { name, position, salary } = req.body;
    const [result] = await db.query(
      'INSERT INTO employees (name, position, salary) VALUES (?, ?, ?)',
      [name, position, salary]
    );
    res.status(201).json({ id: result.insertId, name, position, salary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database insert error' });
  }
};

// Update employee
exports.updateEmployee = async (req, res) => {
  try {
    const { name, position, salary } = req.body;
    const [result] = await db.query(
      'UPDATE employees SET name = ?, position = ?, salary = ? WHERE id = ?',
      [name, position, salary, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json({ id: req.params.id, name, position, salary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database update error' });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database delete error' });
  }
};



// const db = require('../models/db');

// // Get all employees
// exports.getAllEmployees = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM employees');
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database query error' });
//   }
// };

// // Get employee by ID
// exports.getEmployeeById = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
//     if (rows.length === 0) return res.status(404).json({ error: 'Employee not found' });
//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Database query error' });
//   }
// };
