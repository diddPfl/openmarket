import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './Header.css';
import CategoryList from './Category/CategoryList';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content" style={{ flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
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
        <CategoryList />
      </div>
    </header>
  );
}

export default Header;