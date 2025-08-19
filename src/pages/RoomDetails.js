import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/rooms/${id}`)
      .then((res) => {
        const r = res.data;
        const formatted = {
          id: r.room_id,
          name: r.room_no,
          type: r.room_type,
          price: r.price_per_day,
          description: r.description,
          image: r.image_url
        };
        setRoom(formatted);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!room) return <p>Loading...</p>;

  return (
    <div className="room-details">
      <h2>{room.name}</h2>
      <img
        src={room.image || "https://via.placeholder.com/600x350"}
        alt={room.name}
      />
      <p>Type: {room.type}</p>
      <p>Price: Rs.{room.price}</p>
      <p>{room.description}</p>
    </div>
  );
};

export default RoomDetails;
