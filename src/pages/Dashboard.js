import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/bookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, []);

  const updateStatus = (id, action) => {
    axios.patch(`http://localhost:5000/bookings/${id}/${action}`)
      .then(() => {
        alert(`Booking ${action}`);
        setBookings(bookings.filter(b => b.id !== id)); // refresh
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Room</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(b => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.name}</td>
              <td>{b.email}</td>
              <td>{b.room_name}</td>
              <td>{b.status}</td>
              <td>
                <button onClick={() => updateStatus(b.id, "approve")}>Approve</button>
                <button onClick={() => updateStatus(b.id, "reject")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;
