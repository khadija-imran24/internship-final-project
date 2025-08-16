import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isToggled, setIsToggled] = useState(false); // State for toggle button

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <img src="/logo.jpg" alt="Mehman Palace Logo"/>
            <h1>Mehman Palace</h1>
          </Link>
          <button className="hamburger" onClick={handleToggle}>
            ☰
          </button>
          <nav className={`nav ${isToggled ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/rooms" className="nav-link">Rooms</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
