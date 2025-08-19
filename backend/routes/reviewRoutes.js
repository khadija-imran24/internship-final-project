const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all reviews
router.get("/", (req, res) => {
  db.query("SELECT * FROM reviews", (err, results) => {
    if (err) {
      console.error("Error fetching reviews:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// POST new review
router.post("/", (req, res) => {
  const { name, comment, rating } = req.body;
  db.query(
    "INSERT INTO reviews (name, comment, rating) VALUES (?, ?, ?)",
    [name, comment, rating],
    (err, result) => {
      if (err) {
        console.error("Error inserting review:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Review added", id: result.insertId });
    }
  );
});

module.exports = router;
