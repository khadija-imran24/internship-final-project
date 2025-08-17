import React from 'react';
import { Link } from 'react-router-dom';
import { bookings } from '../data/bookings';
import { rooms } from '../data/rooms';
import { reviews } from '../data/reviews';
import './Dashboard.css';

const Dashboard = () => {
  const currentUserId = 1;

  // Get user's bookings
  const userBookings = bookings.filter(booking => booking.user_id === currentUserId);

  const getRoomDetails = (roomId) => {
    return rooms.find(room => room.id === roomId);
  };

  const hasReview = (bookingId) => {
    return reviews.some(review => review.booking_id === bookingId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="container">
          <h1>Dashboard</h1>
          <p>Manage your bookings and profile</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dashboard-content">
            <h2>Your Bookings</h2>

            {userBookings.length === 0 ? (
              <p>You have no bookings yet.</p>
            ) : (
              <div className="bookings-list">
                {userBookings.map(booking => {
                  const room = getRoomDetails(booking.room_id);

                  return (
                    <div key={booking.booking_id} className="booking-card">
                      <div className="booking-info">
                        <div className="room-image">
                          <img src={room.images[0]} alt={room.name} />
                        </div>
                        <h3><Link to={`/room/${room.id}` } className='Linked'>{room?.name}</Link><br></br> (Room No: {room?.roomno})</h3>
                        <p><strong>Type:</strong> {room?.type}</p>
                        <p><strong>Check-in:</strong> {formatDate(booking.arrival_date)}</p>
                        <p><strong>Check-out:</strong> {formatDate(booking.departure_date)}</p>
                        <p><strong>Status:</strong> <span className={`status ${booking.status}`}>{booking.status}</span></p>
                      </div>

                      <div className="booking-actions">
                        {!hasReview(booking.booking_id) ? (
                          <Link to={`/review/${booking.booking_id}`} className="btn btn-review">
                            Write Review
                          </Link>
                        ) : (
                          <p className="reviewed-text">Review Submitted</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
