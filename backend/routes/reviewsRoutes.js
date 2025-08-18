const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviewsController');

router.get('/', reviewsController.getAllReviews);
router.get('/:id', reviewsController.getReviewById);

module.exports = router;
