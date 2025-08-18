const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');

const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

// Public (users can view bookings, maybe their own later)
router.get('/', booksController.getAllBooks);
router.get('/:id', booksController.getBookById);

// Admin-only (manage all bookings)
router.post('/', auth, adminOnly, booksController.createBooking);
router.put('/:id', auth, adminOnly, booksController.updateBooking);
router.delete('/:id', auth, adminOnly, booksController.deleteBooking);

module.exports = router;
