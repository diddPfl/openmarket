import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminCommon.css'; // 기존 Admin 스타일 사용

const OrderStatistics = () => {
  const [dailyStats, setDailyStats] = useState([]);
  const [statusStats, setStatusStats] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderStats = async () => {
      setIsLoading(true);
      try {
        const [dailyResponse, statusResponse, amountResponse, countResponse] = await Promise.all([
          axios.get('/api/order-statistics/daily'),
          axios.get('/api/order-statistics/by-status'),
          axios.get('/api/order-statistics/total-amount'),
          axios.get('/api/order-statistics/total-count')
        ]);

        setDailyStats(dailyResponse.data);
        setStatusStats(statusResponse.data);
        setTotalAmount(amountResponse.data);
        setTotalCount(countResponse.data);
      } catch (error) {
        console.error('Error fetching order statistics:', error);
        setError('Failed to load order statistics. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderStats();
  }, []);

  if (isLoading) return <div className="admin-section">Loading order statistics...</div>;
  if (error) return <div className="admin-section">{error}</div>;

  return (
    <div className="admin-page">
      <h1 className="admin-title">주문 통계</h1>
      <div className="admin-dashboard">
        <div className="admin-sections">
          <div className="admin-section">
            <h2>오늘의 주문 통계</h2>
            {dailyStats.length > 0 ? (
              <p>
                {dailyStats[0].date}: {dailyStats[0].orderCount}건, {dailyStats[0].totalAmount.toLocaleString()}원
              </p>
            ) : (
              <p>오늘의 주문 데이터가 없습니다.</p>
            )}
          </div>
          <div className="admin-section">
            <h2>주문 상태별 통계</h2>
            <ul>
              {statusStats.map(stat => (
                <li key={stat.orderStatus}>
                  {stat.orderStatus}: {stat.orderCount}건, {stat.totalAmount.toLocaleString()}원
                </li>
              ))}
            </ul>
          </div>
          <div className="admin-section">
            <h2>전체 주문 통계</h2>
            <p>총 주문 건수: {totalCount}건</p>
            <p>총 주문 금액: {totalAmount.toLocaleString()}원</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatistics;