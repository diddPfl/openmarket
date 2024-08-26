import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ItemDetail.css';

const ItemDetail = () => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { itemId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin/items/${itemId}`);
        console.log('API 응답:', response.data);
        setItem(response.data);
      } catch (err) {
        console.error('Error fetching item details:', err.response?.data || err.message);
        setError('Failed to fetch item details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchItemDetail();
  }, [itemId]);

  const handleBackToList = () => {
    navigate(-1);
  };

  if (loading) return <div className="loading">Loading item details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!item) return <div className="not-found">Item not found</div>;

  return (
    <div className="item-detail">
      <h2>{item.itemName}</h2>
      <div className="item-images">
        {item.images && item.images.map((image, index) => (
          <img key={index} src={`http://localhost:9000/view/${image.fileName}`} alt={`${item.itemName} ${index + 1}`} />
        ))}
      </div>
      <div className="item-info">
        <p><strong>Brand:</strong> {item.brand}</p>
        <p><strong>Price:</strong> {item.price.toLocaleString()}원</p>
        <p><strong>Description:</strong> {item.itemDetail}</p>
        <p><strong>Category:</strong> {item.categoryName}</p>
        <p><strong>Stock:</strong> {item.stockNumber}</p>
        <p><strong>Status:</strong> {item.itemSellStatus}</p>
        <p><strong>Registration Date:</strong> {new Date(item.regdate).toLocaleDateString()}</p>
        <p><strong>Is Disabled:</strong> {item.isDisabled ? 'Yes' : 'No'}</p>
      </div>
      <button onClick={handleBackToList} className="back-button">Back to List</button>
    </div>
  );
};

export default ItemDetail;