import React from 'react';
import { Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Mehman Palace</h1>
          <p>Experience unparalleled comfort and luxury in the heart of paradise</p>
          <Link to="/rooms" className="btn">View Our Rooms</Link>
        </div>
      </section>

      {/* About Section */}
      <section className="section about">
        <div className="container">
          <div className="section-title">
            <h2>About Our Hotel</h2>
            <p>Discover the perfect blend of luxury and comfort</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <h3>Your Home Away From Home</h3>
              <p>
                Nestled in the heart of paradise, our luxury hotel offers an unforgettable experience 
                with world-class amenities, stunning views, and exceptional service. Whether you're 
                here for business or pleasure, we ensure your stay is nothing short of extraordinary.
              </p>
              <p>
                From our elegantly appointed rooms to our gourmet dining options and state-of-the-art 
                facilities, every detail has been carefully crafted to exceed your expectations.
              </p>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Luxury Hotel" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="section featured-rooms">
        <div className="container">
          <div className="section-title">
            <h2>Featured Rooms</h2>
            <p>Discover our most popular accommodations</p>
          </div>
          <div className="rooms-grid">
            {rooms.slice(0, 3).map(room => (
              <div key={room.id} className="room-card">
                <img src={room.images[0]} alt={room.name} />
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p className="room-type">{room.type}</p>
                  <p className="price" color='#853540'>PKR.{room.price}/night</p>
                  <p className="room-description">{room.description}</p>
                  <Link to={`/room/${room.id}`} className="btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-amenities">
        <div className="container">
          <div className="section-title">
            <h2>Hotel Amenities</h2>
            <p>Everything you need for a perfect stay</p>
          </div>
          <div className="amenities-grid">
            <div className="amenity">
              <i className="fas fa-wifi"></i>
              <h3>High-Speed WiFi</h3>
              <p>Stay connected with complimentary high-speed internet throughout the hotel</p>
            </div>
            <div className="amenity">
              <i className="fas fa-swimming-pool"></i>
              <h3>Swimming Pool</h3>
              <p>Relax and unwind in our temperature-controlled swimming pool</p>
            </div>
            <div className="amenity">
              <i className="fas fa-dumbbell"></i>
              <h3>Fitness Center</h3>
              <p>Stay fit with our state-of-the-art gym equipment</p>
            </div>
            <div className="amenity">
              <i className="fas fa-utensils"></i>
              <h3>Restaurant</h3>
              <p>Enjoy exquisite dining at our on-site restaurant</p>
            </div>
            <div className="amenity">
              <i className="fas fa-car"></i>
              <h3>Parking</h3>
              <p>Complimentary valet parking for all guests</p>
            </div>
             <div className="amenity">
              <i className="fas fa-buffet"></i>
              <h3>Buffet</h3>
              <p>Enjoy our special buffet with special cuisines.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
