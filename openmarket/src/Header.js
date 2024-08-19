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
      <div className="header-content">
        <div className="top-bar">
          <Link to="/" className="logo">OpenMarket</Link>
          <nav>
            <ul style={{ display: 'flex', gap: '1rem' }}>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/sell">Sell</Link></li>
              <li><Link to="/about">About</Link></li>
            </ul>
          </nav>
          <div className="user-actions">
            <Link to="/login">로그인</Link>
            <Link to="/signup">회원가입</Link>
          </div>
        </div>
        <div className="category-and-support">
          <CategoryList />
          <Link to="/support" className="support-link">고객센터</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;