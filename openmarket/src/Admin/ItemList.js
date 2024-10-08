import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from './api';
import './AdminCommon.css';

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await adminApi.fetchItems();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleItemClick = (itemId) => {
    navigate(`/admin/items/${itemId}`);
  };

  if (loading) return <div className="loading">Loading items...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-page">
      <h2>상품 관리</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>상품 ID</th>
            <th>상품명</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.itemId}>
              <td>{item.itemId}</td>
              <td>
                <span
                  className="item-name-link"
                  onClick={() => handleItemClick(item.itemId)}
                >
                  {item.itemName}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;