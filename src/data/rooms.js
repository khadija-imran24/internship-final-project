import React, { useEffect, useState } from "react";
import axios from "axios";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/rooms")
      .then((res) => {
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
      <h2>Available Rooms ({rooms.length})</h2>
      <div className="rooms-grid">
        {rooms.length > 0 ? (
          rooms.map((room) => (
            <div key={room.id} className="room-card">
              <img
                src={room.image || "https://via.placeholder.com/400x250"}
                alt={room.name}
              />
              <h3>{room.name}</h3>
              <p>{room.type}</p>
              <p>Rs.{room.price}</p>
              <p>{room.description}</p>
            </div>
          ))
        ) : (
          <p>No rooms available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default Rooms;
