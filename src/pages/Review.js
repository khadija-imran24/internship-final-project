import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookings } from '../data/bookings';
import { rooms } from '../data/rooms';
import { users } from '../data/users';
import { reviews } from '../data/reviews';
import './Review.css';

const ReviewForm = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const booking = bookings.find(b => b.booking_id === parseInt(bookingId));
  const room = rooms.find(r => r.id === booking?.room_id);
  const user = users.find(u => u.user_id === booking?.user_id);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      review_id: reviews.length + 1,
      booking_id: booking.booking_id,
      rating,
      comment
    };

    reviews.push(newReview);
    console.log("Review submitted:", newReview);

    alert("Thank you for your review!");
    navigate("/dashboard");
  };

  if (!booking || !room || !user) {
    return <p>Booking not found.</p>;
  }

  return (
    <div className="review-form-page">
      <div className="review-hero">
        <div className="container">
          <h1>Write a Review</h1>
          <p>Share your experience and help others make informed decisions</p>
        </div>
      </div>

      <div className="container">
        <div className="review-form-container">
          <h2>Review Your Stay</h2>
          
          <div className="booking-info">
            <p><strong>Room:</strong> {room.name} (No: {room.roomno})</p>
            <p><strong>Guest:</strong> {user.name}</p>
            <p><strong>Booking ID:</strong> #{booking.booking_id}</p>
          </div>

          <form onSubmit={handleSubmit} className="review-form">
            {/* Star Rating */}
            <div className="form-group">
              <label>Overall Rating:</label>
              <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(rating)}
                    className="star-button"
                  >
                    <span
                      className={`star ${star <= (hover || rating) ? 'active' : ''}`}
                    >
                      ★
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment Box */}
            <div className="form-group">
              <label>Your Feedback:</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us about your experience..."
                rows="4"
                required
              />
            </div>

            <button type="submit" className="btn btn-submit">
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
