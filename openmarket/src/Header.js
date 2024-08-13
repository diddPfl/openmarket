import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header-container">
      <div className="header-content">
        <Link to="/" className="logo">OpenMarket</Link>
        <nav>
          <ul>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/sell">Sell</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </nav>
        <div className="user-actions">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;