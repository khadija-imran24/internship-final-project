import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div className="container">
          <h1>Dashboard</h1>
          <p>Manage your bookings and profile</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="dashboard-content">
            <h2>Welcome to your Dashboard</h2>
            <p>This is your personal dashboard where you can:</p>
            <ul>
              <li>View your booking history</li>
              <li>Manage upcoming reservations</li>
              <li>Update your profile information</li>
              <li>Leave reviews for your stays</li>
            </ul>
            <p>Dashboard functionality will be implemented with backend integration.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
