import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="admin-layout">
      {/* Hamburger button (visible on small screens) */}
      <div className={`admin-hamburger ${isOpen ? "open" : ""}`} onClick={toggleSidebar}>
        <span></span>
        <span></span>
        <span></span>
      </div>


      {/* Sidebar */}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/admin/dashboard" onClick={toggleSidebar}>Dashboard</Link></li>
            <li><Link to="/admin/rooms" onClick={toggleSidebar}>Rooms</Link></li>
            <li><Link to="/admin/employees" onClick={toggleSidebar}>Employees</Link></li>
            <li><Link to="/admin/bookings" onClick={toggleSidebar}>Bookings</Link></li>
            <li><Link to="/admin/reviews" onClick={toggleSidebar}>Reviews</Link></li>
            <li><Link to="/logout" onClick={toggleSidebar}>Logout</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
