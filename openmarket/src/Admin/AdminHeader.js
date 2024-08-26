import React from "react";
import { Link, useNavigate } from "react-router-dom";
import './AdminHeader.css';

function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 로그아웃 로직
    navigate('/');
  };

  return (
    <header className="admin-header-container">
      <div className="admin-header-content">
        <Link to="/admin" className="admin-logo">Admin Dashboard</Link>
        <nav>
          <ul>
            <li><Link to="/admin/items">Items</Link></li>
            <li><Link to="/admin/members">Members</Link></li>
            <li><Link to="/admin/brands">Brands</Link></li>
            <li><Link to="/admin/notices">Notices</Link></li>
            <li><Link to="/admin/order-statistics">Statistics</Link></li>
          </ul>
        </nav>
        <div className="admin-user-actions">
          <Link to="/" className="admin-home-button">Home</Link>
          <button onClick={handleLogout} className="admin-logout-button">Logout</button>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;