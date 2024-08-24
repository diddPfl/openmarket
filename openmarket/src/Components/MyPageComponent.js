import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyPageComponent.css';

const MyPage = () => {
  const [name, setName] = useState('');
  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    fetch('/mypage', {
      credentials: 'include'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setName(data.name);
        setOrderStatus(data.orderStatus);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="container">
      <div className="sidebar">
        <div className="text-logo">마이페이지</div>
        <ul className="nav-list">
          <li className="nav-item"><Link to="#">주문/배송조회</Link></li>
          <li className="nav-item"><Link to="/mypage/cart">장바구니</Link></li>
          <li className="nav-item"><Link to="#">좋아요</Link></li>
          <li className="nav-item"><Link to="/mypage/reviews">리뷰</Link></li>
          <hr className="hr" />
          <li className="nav-item"><Link to="#">정보수정</Link></li>
          <li className="nav-item"><Link to="#">계좌관리</Link></li>
          <li className="nav-item"><Link to="#">배송지관리</Link></li>
        </ul>
      </div>

      <div className="main-content">
        <h1 className="h1">{name} 님</h1>

        <div className="status-box">
          <div className="status-item">주문접수 <span>{orderStatus.received || 0}</span></div>
          <div className="status-item">상품준비중 <span>{orderStatus.preparing || 0}</span></div>
          <div className="status-item">배송중 <span>{orderStatus.shipping || 0}</span></div>
          <div className="status-item">배송완료 <span>{orderStatus.delivered || 0}</span></div>
        </div>

        <div className="status-box">
          <div className="status-item">취소 <span>{orderStatus.cancelled || 0}</span></div>
          <div className="status-item">교환 <span>{orderStatus.exchanged || 0}</span></div>
          <div className="status-item">반품 <span>{orderStatus.returned || 0}</span></div>
          <div className="status-item">구매확정 <span>{orderStatus.confirmed || 0}</span></div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;