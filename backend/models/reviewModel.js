const db = require("../db");

exports.getAllReviews = (callback) => {
  db.query("SELECT * FROM reviews", (err, results) => {
    if (err) return callback(err, null);

    const formatted = results.map(rv => ({
      id: rv.review_id,
      name: rv.customer_name,
      review: rv.review_text
    }));

    callback(null, formatted);
  });
};

exports.createReview = (name, review, callback) => {
  db.query(
    "INSERT INTO reviews (customer_name, review_text) VALUES (?, ?)",
    [name, review],
    (err, result) => {
      if (err) return callback(err, null);
      callback(null, { id: result.insertId, message: "Review added" });
    }
  );
};
