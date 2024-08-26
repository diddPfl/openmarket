// Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';  // This import should work now

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="text-logo">마이페이지</div>
      <ul className="nav-list">
        <li className="nav-item"><Link to="/mypage/deliverylist">주문/배송조회</Link></li>
        <li className="nav-item"><Link to="/mypage/cart">장바구니</Link></li>
        <li className="nav-item"><Link to="#">좋아요</Link></li>
        <li className="nav-item"><Link to="/mypage/reviews">리뷰</Link></li>
        <hr className="hr" />
        <li className="nav-item"><Link to="#">정보수정</Link></li>
        <li className="nav-item"><Link to="#">계좌관리</Link></li>
        <li className="nav-item"><Link to="#">배송지관리</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;