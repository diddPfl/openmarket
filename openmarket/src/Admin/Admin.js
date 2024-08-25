import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  // 하드코딩된 관리자 정보
  const adminUser = {
    name: "admin",
    role: "ADMIN"
  };

  // 하드코딩된 통계 정보
  const [stats] = useState({
    itemCount: 100,
    memberCount: 50,
    brandCount: 10,
    noticeCount: 5
  });

  return (
    <div className="admin-dashboard">
      <div className="admin-sections">
        <section className="admin-section">
          <h2>상품 관리</h2>
          <p>총 상품 수: {stats.itemCount}</p>
          <Link to="/admin/items" className="admin-link">상품 목록 보기</Link>
          <Link to="/admin/items/new" className="admin-link">새 상품 등록</Link>
        </section>
        <section className="admin-section">
          <h2>회원 관리</h2>
          <p>총 회원 수: {stats.memberCount}</p>
          <Link to="/admin/members" className="admin-link">회원 목록 보기</Link>
        </section>
        <section className="admin-section">
          <h2>브랜드 관리</h2>
          <p>총 브랜드 수: {stats.brandCount}</p>
          <Link to="/admin/brands" className="admin-link">브랜드 목록 보기</Link>
          <Link to="/admin/brands/new" className="admin-link">새 브랜드 등록</Link>
        </section>
        <section className="admin-section">
          <h2>공지사항 관리</h2>
          <p>총 공지사항 수: {stats.noticeCount}</p>
          <Link to="/admin/notices" className="admin-link">공지사항 목록 보기</Link>
          <Link to="/admin/notices/new" className="admin-link">새 공지사항 작성</Link>
        </section>
      </div>
    </div>
  );
};

export default Admin;