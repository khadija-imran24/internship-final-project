const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

// GET /bookings
router.get("/", bookingController.getBookings);

// POST /bookings
router.post("/", bookingController.createBooking);

module.exports = router;
