import React, { useState, useEffect } from 'react';
import { adminApi } from './api';
import './AdminCommon.css';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.fetchBrands();
      console.log('Fetched brands:', data);
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Failed to fetch brands. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (brandName) => {
    try {
      await adminApi.deleteBrand(brandName);
      console.log(`Brand ${brandName} deleted successfully`);
      setBrands(brands.filter(brand => brand !== brandName));
    } catch (error) {
      console.error('Failed to delete brand:', error);
      setError(`Failed to delete brand ${brandName}. Please try again.`);
    }
  };

  if (loading) return <div className="loading">Loading brands...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-page">
      <h2>브랜드 관리</h2>
      {brands.length === 0 ? (
        <p>브랜드가 없습니다.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>브랜드명</th>
              <th>작업</th>
            </tr>
          </thead>
          <tbody>
            {brands.map(brand => (
              <tr key={brand}>
                <td>{brand}</td>
                <td>
                  <button onClick={() => handleDelete(brand)} className="admin-button delete-button">삭제</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BrandList;