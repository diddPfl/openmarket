import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './AdminLayout.css';

function AdminHeader() {
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
        </div>
        <div className="admin-category-and-support">
          <Link to="/" className="admin-to-main">메인 페이지로</Link>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;