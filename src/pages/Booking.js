import React from 'react';
import { useParams } from 'react-router-dom';
import { rooms } from '../data/rooms';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const room = rooms.find(r => r.id === parseInt(id));

  if (!room) {
    return <div>Room not found</div>;
  }

  return (
    <div className="booking-page">
      <section className="booking-hero">
        <div className="container">
          <h1>Book {room.name}</h1>
          <p>Complete your reservation</p>
        </div>
      </section>
       <div className="booking-summary">
              <h3>Booking Summary</h3>
              <div className="summary-card">
                <img src={room.images[0]} alt={room.name} />
                <h4>{room.name}</h4>
                <p>{room.type}</p>
                <p>${room.price}/night</p>
                <p>Max {room.maxGuests} guests</p>
              </div>
            </div>
      <section className="section">
        <div className="container">
          <div className="booking-layout">
            <div className="booking-form">
              <h2>Guest Information</h2>
              <form>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" required />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input type="tel" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Arrival Date</label>
                    <input type="date" required />
                  </div>
                  <div className="form-group">
                    <label>Departure Date</label>
                    <input type="date" required />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Adults</label>
                    <input type="number" min="1" max={room.maxGuests} defaultValue="1" />
                  </div>
                  <div className="form-group">
                    <label>Children</label>
                    <input type="number" min="0" defaultValue="0" />
                  </div>
                </div>
                <button type="submit" className="btn">Proceed to Payment</button>
              </form>
            </div>
            
           
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
