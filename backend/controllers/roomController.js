const db = require("../db");


// ✅ Get all rooms
exports.getRooms = (req, res) => {
  const query = `
    SELECT 
      room_id AS id,
      room_no AS name,
      room_type AS type,
      price_per_day AS price,
      description,
      image_url AS image,
      status
    FROM rooms
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// ✅ Get room by ID
exports.getRoomById = (req, res) => {
  const roomId = req.params.id;
  const query = `
    SELECT 
      room_id AS id,
      room_no AS name,
      room_type AS type,
      price_per_day AS price,
      description,
      image_url AS image,
      status
    FROM rooms
    WHERE room_id = ?
  `;
  db.query(query, [roomId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: "Room not found" });
    res.json(results[0]);
  });
};
