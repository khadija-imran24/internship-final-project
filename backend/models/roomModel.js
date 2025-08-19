const db = require("../db");

// Fetch all rooms
exports.getAllRooms = (callback) => {
  db.query("SELECT * FROM rooms", (err, results) => {
    if (err) return callback(err, null);

    const formatted = results.map(r => ({
      id: r.room_id,
      name: r.room_no,
      type: r.room_type,
      price: r.price_per_day,
      description: r.description,
      image: r.image_url,
      status: r.status
    }));

    callback(null, formatted);
  });
};
