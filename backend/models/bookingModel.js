const db = require("../db");

exports.getAllBookings = (callback) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) return callback(err, null);

    const formatted = results.map(b => ({
      id: b.booking_id,
      customer: b.customer_name,
      email: b.email,
      roomId: b.room_id,
      status: b.status
    }));

    callback(null, formatted);
  });
};

exports.createBooking = (customer, email, roomId, callback) => {
  db.query(
    "INSERT INTO bookings (customer_name, email, room_id, status) VALUES (?, ?, ?, 'pending')",
    [customer, email, roomId],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, { id: result.insertId, message: "Booking created" });
    }
  );
};
