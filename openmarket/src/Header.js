// Header.js
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import CategoryList from './Category/CategoryList';
import { useAuth } from './context/AuthContext';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, name, logout } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

const handleSearch = (e) => {
  e.preventDefault();
  if (searchTerm.trim()) {
    navigate(`/search?term=${encodeURIComponent(searchTerm)}`);
  }
};

  return (
    <header className={`header-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="top-bar">
          <Link to="/" className="logo">OpenMarket</Link>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <nav>
            <ul style={{ display: 'flex', gap: '1rem' }}>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/sell">Sell</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/item/insert">상품등록</Link></li>
              <li><Link to="/admin">관리자페이지</Link></li>
            </ul>
          </nav>
          <div className="user-actions">
            {isAuthenticated ? (
              <>
                <span>{name}(님)</span>
                <button onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <>
                <Link to="/login">로그인</Link>
                <Link to="/signup">회원가입</Link>
              </>
            )}
          </div>
        </div>
        <div className="category-and-support">
          <CategoryList />
          <Link to="/notices" className="support-link">고객센터</Link>
        </div>
      </div>
    </header>
  );
}

export default Header;