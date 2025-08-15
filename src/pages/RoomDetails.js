import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { rooms } from '../data/rooms';
import './RoomDetails.css';

const RoomDetails = () => {
  const { id } = useParams();
  const room = rooms.find(r => r.id === parseInt(id));
  const [selectedImage, setSelectedImage] = useState(0);

  if (!room) {
    return (
      <div className="container">
        <h1>Room Not Found</h1>
        <Link to="/rooms">Back to Rooms</Link>
      </div>
    );
  }

  return (
    <div className="room-details-page">
      <section className="room-hero">
        <div className="container">
          <h1>{room.name}</h1>
          <p>{room.type} • PKR. {room.price}/night</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="room-layout">
            {/* Image Gallery */}
            <div className="room-gallery">
              <div className="main-image">
                <img src={room.images[selectedImage]} alt={room.name} />
              </div>
              <div className="thumbnail-gallery">
                {room.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${room.name} ${index + 1}`}
                    className={index === selectedImage ? 'active' : ''}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Room Information */}
            <div className="room-info">
              <h2>{room.name}</h2>
              <p className="room-type">{room.type}</p>
              <p className="price">PKR. {room.price}/night</p>
              
              <div className="room-specs">
                <div className="spec">
                  <span className="spec-label">Room No.:</span>
                  <span className="spec-value">{room.roomno}</span>
                </div>
                <div className="spec">
                  <span className="spec-label">Servant Name:</span>
                  <span className="spec-value">{room.servant} </span>
                </div>
                <div className="spec">
                  <span className="spec-label">Servant Contact:</span>
                  <span className="spec-value">{room.servantContact}</span>
                </div>
              </div>

              <div className="room-description">
                <h3>Description</h3>
                <p>{room.description}</p>
              </div>

              
             

              <Link to={`/booking/${room.id}`} className="btn book-now">
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RoomDetails;
