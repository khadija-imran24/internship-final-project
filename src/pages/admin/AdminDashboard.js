import React from "react";
import "./AdminDashboard.css";
import { dashboardStats, bookingTrends, roomStatus } from "../../data/adminDashboardData";
import { PieChart, Pie, Cell, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

function AdminDashboard() {
  const COLORS = ["#4CAF50", "#F44336"]; // Green = available, Red = occupied

  return (
    <div className="admin-dashboard">
      {/* Top Cards */}
      <div className="cards-container">
        <div className="card total-rooms">
          <h3>Total Rooms</h3>
          <p>{dashboardStats.totalRooms}</p>
        </div>
        <div className="card available-rooms">
          <h3>Available Rooms</h3>
          <p>{dashboardStats.availableRooms}</p>
        </div>
        <div className="card occupied-rooms">
          <h3>Occupied Rooms</h3>
          <p>{dashboardStats.occupiedRooms}</p>
        </div>
        <div className="card total-bookings">
          <h3>Total Bookings</h3>
          <p>{dashboardStats.totalBookings}</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-container">
        {/* Pie Chart */}
        <div className="chart-box">
          <h3>Room Availability</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={roomStatus}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label
            >
              {roomStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Line Chart */}
        <div className="chart-box">
          <h3>Bookings Per Month</h3>
          <LineChart width={500} height={300} data={bookingTrends}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bookings" stroke="#2196F3" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
