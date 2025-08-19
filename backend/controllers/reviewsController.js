const Review = require("../models/reviewModel");

exports.getReviews = (req, res) => {
  Review.getAllReviews((err, reviews) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(reviews);
  });
};

exports.createReview = (req, res) => {
  const { name, review } = req.body;
  Review.createReview(name, review, (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json(result);
  });
};
