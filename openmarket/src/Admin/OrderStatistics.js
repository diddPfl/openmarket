import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 7);

        const [dailyResponse, statusResponse, amountResponse, countResponse] = await Promise.all([
          axios.get(`/api/order-statistics/daily?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`),
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

  if (isLoading) return <div>Loading order statistics...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="order-statistics">
      <h2>주문 통계</h2>
      <div>
        <h3>일별 주문 통계 (최근 7일)</h3>
        <ul>
          {dailyStats.map(stat => (
            <li key={stat.date}>
              {stat.date}: {stat.orderCount}건, {stat.totalAmount.toLocaleString()}원
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>주문 상태별 통계</h3>
        <ul>
          {statusStats.map(stat => (
            <li key={stat.orderStatus}>
              {stat.orderStatus}: {stat.orderCount}건, {stat.totalAmount.toLocaleString()}원
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>전체 주문 통계</h3>
        <p>총 주문 건수: {totalCount}건</p>
        <p>총 주문 금액: {totalAmount.toLocaleString()}원</p>
      </div>
    </div>
  );
};

export default OrderStatistics;