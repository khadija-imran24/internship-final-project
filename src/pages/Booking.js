import React, { useState, useEffect } from "react";
import axios from "axios";

function Booking() {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({ room_id: "", name: "", email: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/rooms")
      .then(res => setRooms(res.data))
      .catch(err => console.error("Error fetching rooms:", err));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post("http://localhost:5000/bookings", form)
      .then(() => alert("Booking request sent!"))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Book a Room</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Your Name" onChange={handleChange} />
        <input name="email" placeholder="Your Email" onChange={handleChange} />

        <select name="room_id" onChange={handleChange}>
          <option value="">Select Room</option>
          {rooms.map(r => (
            <option key={r.id} value={r.id}>
              {r.name} - Rs.{r.price}
            </option>
          ))}
        </select>

        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default Booking;
