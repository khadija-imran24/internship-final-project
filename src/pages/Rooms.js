import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Rooms.css"; // keep your old css

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
  axios.get("http://localhost:5000/api/rooms")
    .then((res) => {
      console.log("API Response:", res.data);   // 👈 check this in browser console
      const formattedRooms = res.data.map((r) => ({
        id: r.room_id,
        name: r.room_no,
        type: r.room_type,
        price: r.price_per_day,
        description: r.description,
        image: r.image_url
      }));
      setRooms(formattedRooms);
    })
    .catch((err) => console.error("Error fetching rooms:", err));
}, []);


  return (
    <div className="rooms-page">
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Our Rooms</h2>
            <p>Choose from a variety of styles to suit your needs</p>
          </div>

          <div className="rooms-grid">
            {rooms.map((room) => (
              <div key={room.id} className="room-card">
                <img
                  src={room.image || "https://via.placeholder.com/400x250"}
                  alt={room.name}
                />
                <div className="room-info">
                  <h3>{room.name}</h3>
                  <p className="room-type">{room.type}</p>
                  <p className="price">PKR {room.price}/night</p>
                  <p className="room-description">{room.description}</p>
                  <Link to={`/room/${room.id}`} className="btn">
                    View Details
                  </Link>
                </div>
              </div>
            ))}

            {rooms.length === 0 && (
              <p className="no-rooms">No rooms available at the moment.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Rooms;
