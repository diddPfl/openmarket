import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="admin-dashboard">
      <h1>관리자 대시보드</h1>
      <div className="admin-sections">
        <section className="admin-section">
          <h2>상품 관리</h2>
          <Link to="/admin/items" className="admin-link">상품 목록 보기</Link>
        </section>
        <section className="admin-section">
          <h2>회원 관리</h2>
          <Link to="/admin/members" className="admin-link">회원 목록 보기</Link>
        </section>
        <section className="admin-section">
          <h2>브랜드 관리</h2>
          <Link to="/admin/brands" className="admin-link">브랜드 목록 보기</Link>
        </section>
        <section className="admin-section">
          <h2>공지사항 관리</h2>
          <Link to="/admin/notices" className="admin-link">공지사항 목록 보기</Link>
        </section>
      </div>
    </div>
  );
};

export default Admin;