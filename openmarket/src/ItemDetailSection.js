import React from 'react';

const ItemDetailSection = ({ item }) => (
  <div className="item-detail-section">
    <h2>상품 상세</h2>
    <p>{item.itemDetail}</p>
  </div>
);

export default ItemDetailSection;