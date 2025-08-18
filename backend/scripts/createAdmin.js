// run: node scripts/createAdmin.js
require('dotenv').config();
const db = require('../models/db');
const bcrypt = require('bcryptjs');

async function run() {
  const password = 'Admin@123'; // change this
  const hashed = await bcrypt.hash(password, 10);
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    ['Admin', 'superadmin@example.com', hashed, 'admin']
  );
  console.log('Admin created with id', result.insertId);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
