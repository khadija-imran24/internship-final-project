import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { rooms, roomTypes } from '../data/rooms';
import { bookings } from '../data/bookings';
import './Rooms.css';

const Rooms = () => {
  const [selectedType, setSelectedType] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 500]);

  const [arrivalDate, setArrivalDate] = useState('');

  // Function to check if a room is available for selected arrival date
  const isRoomAvailable = (roomId, arrival) => {
    if (!arrival) return true; // If no arrival date selected, show all rooms
    
    const arrivalDate = new Date(arrival);
    
    // Check if room has any bookings on or after the arrival date
    const hasFutureBooking = bookings.some(booking => {
      if (booking.room_id !== roomId) return false;
      
      const bookingArrival = new Date(booking.arrival_date);
      
      // Check if booking arrival is on or after the selected arrival date
      return bookingArrival >= arrivalDate;
    });
    
    return !hasFutureBooking;
  };

  const filteredRooms = rooms.filter(room => {
    const typeMatch = selectedType === 'All' || room.type === selectedType;
    const priceMatch = room.price >= priceRange[0] && room.price <= priceRange[1];
    const arrivalMatch = isRoomAvailable(room.id, arrivalDate);
    
    return typeMatch && priceMatch  && arrivalMatch;
  });

  const handleResetFilters = () => {
    setSelectedType('All');
    setPriceRange([0, 500]);
   
    setArrivalDate('');
  };

  return (
    <div className="rooms-page">
      <section className="rooms-hero">
        <div className="container">
          <h1>Our Rooms</h1>
          <p>Find the perfect accommodation for your stay</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="rooms-layout">
            {/* Filters Sidebar */}
            <aside className="filters">
              <h3>Filter Rooms</h3>
              
              <div className="filter-group">
                <label>Room Type</label>
                <select 
                  value={selectedType} 
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                />
              </div>


              <div className="filter-group">
                <label>Arrival Date</label>
                <input
                  type="date"
                  value={arrivalDate}
                  onChange={(e) => setArrivalDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <button 
                className="btn" 
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </aside>

            {/* Rooms Grid */}
            <div className="rooms-content">
              <div className="rooms-header">
                <h2>Available Rooms ({filteredRooms.length})</h2>
              </div>
              
              <div className="rooms-grid">
                {filteredRooms.map(room => (
                  <div key={room.id} className="room-card">
                    <div className="room-image">
                      <img src={room.images[0]} alt={room.name} />
                    </div>
                    <div className="room-details">
                      <h3>{room.name}</h3>
                      <p className="room-type">{room.type}</p>
                      <p className="room-price">${room.price}/night</p>
                      <p className="room-description">{room.description}</p>
                      
                      <Link to={`/room/${room.id}`} className="btn">View Details</Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
