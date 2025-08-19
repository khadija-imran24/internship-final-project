const Booking = require("../models/bookingModel");

exports.getBookings = (req, res) => {
  Booking.getAllBookings((err, bookings) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(bookings);
  });
};

exports.createBooking = (req, res) => {
  const { customer, email, roomId } = req.body;
  Booking.createBooking(customer, email, roomId, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
};
