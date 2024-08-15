import React from 'react';
import './ItemDetailSection.css'

const ItemDetailSection = ({ item }) => (
  <div className="item-detail-section">
    <h2>상품 상세</h2>
    <p>{item.itemDetail}</p>
    <div className="image-list">
      {item.images && item.images.map((image, index) => (
        <img key={index} src={`/view/${image.fileName}`} alt={`상품 이미지 ${index + 1}`} className="item-image" />
      ))}
    </div>
  </div>
);

export default ItemDetailSection;