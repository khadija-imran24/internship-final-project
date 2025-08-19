// backend/models/db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",       // change to your MySQL username
  password: "Neymar11",       // change to your MySQL password
  database: "hotel_booking_system"   // change to your DB name
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
    return;
  }
  console.log("✅ MySQL Connected...");
});

module.exports = db;
