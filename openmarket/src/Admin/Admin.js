import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Admin.css';
import OrderStatistics from './OrderStatistics';
import './OrderStatistics.css'

const Admin = () => {
  const [stats, setStats] = useState({
    itemCount: 0,
    memberCount: 0,
    brandCount: 0,
    noticeCount: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
        const [itemsResponse, membersResponse, brandsResponse, noticesResponse] = await Promise.all([
          axios.get('/api/admin/items/count'),
          axios.get('/api/admin/members/count'),
          axios.get('/api/admin/brands/count'),
          axios.get('/api/admin/notices/count')
        ]);

        setStats({
          itemCount: itemsResponse.data,
          memberCount: membersResponse.data,
          brandCount: brandsResponse.data,
          noticeCount: noticesResponse.data
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
        setError('Failed to load statistics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) return <div>Loading statistics...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-sections">
        <section className="admin-section">
          <h2>상품 관리</h2>
          <p>총 상품 수: {stats.itemCount}</p>
          <Link to="/admin/items" className="admin-link">상품 목록 보기</Link>
          <Link to="/item/insert" className="admin-link">새 상품 등록</Link>
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
       <section className="admin-section">
        <h2>주문 관리</h2>
        <Link to="/admin/order-statistics" className="admin-link">주문 통계 보기</Link>
      </section>
      </div>
    </div>
  );
};

export default Admin;