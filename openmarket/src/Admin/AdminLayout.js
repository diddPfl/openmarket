import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './AdminLayout.css';
import { useAuth } from '../context/AuthContext';

function AdminHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, name, logout } = useAuth();
  const navigate = useNavigate();

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

  return (
    <header className={`admin-header-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="admin-header-content">
        <div className="admin-top-bar">
          <Link to="/admin" className="admin-logo">Admin Dashboard</Link>
          <nav>
            <ul style={{ display: 'flex', gap: '1rem' }}>
              <li><Link to="/admin/items">상품 관리</Link></li>
              <li><Link to="/admin/members">회원 관리</Link></li>
              <li><Link to="/admin/orders">주문 관리</Link></li>
              <li><Link to="/admin/notices">공지사항 관리</Link></li>
            </ul>
          </nav>
          <div className="admin-user-actions">
            {isAuthenticated ? (
              <>
                <span>{name} 관리자</span>
                <button onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </div>
        <div className="admin-category-and-support">
          <Link to="/" className="admin-to-main">메인 페이지로</Link>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;