// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ logout }) {
  return (
    <nav className="navbar">
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/user-profile">Profile</Link>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
