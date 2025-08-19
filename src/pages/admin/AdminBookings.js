// src/pages/admin/AdminBookings.js
import React, { useState } from "react";
import { bookings as mockBookings } from "../../data/adminBookingsMock";
import "./AdminBookings.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState(mockBookings);
  const [search, setSearch] = useState("");

  // Filter bookings by search term
  const filteredBookings = bookings.filter(
    (b) =>
      b.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      b.room_type.toLowerCase().includes(search.toLowerCase()) ||
      b.status.toLowerCase().includes(search.toLowerCase())
  );

  // Handle status update
  const updateStatus = (id, newStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  // Handle delete booking
  const deleteBooking = (id) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="bookings-page">
      <h1>Bookings Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name, room type, or status..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      {/* Table */}
      <table className="bookings-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Room</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredBookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.customer_name}</td>
              <td>{b.customer_email}</td>
              <td>
                #{b.room_id} ({b.room_type})
              </td>
              <td>{b.check_in}</td>
              <td>{b.check_out}</td>
              <td>
                <select
                  value={b.status}
                  onChange={(e) => updateStatus(b.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked_in">Checked In</option>
                  <option value="checked_out">Checked Out</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>${b.total_price}</td>
              <td>{b.created_at}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteBooking(b.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filteredBookings.length === 0 && (
            <tr>
              <td colSpan="10" style={{ textAlign: "center" }}>
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
