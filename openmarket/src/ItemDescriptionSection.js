import React from 'react';

const ItemDescriptionSection = ({ item }) => (
  <div className="item-description-section">
    <h2>상품 설명</h2>
    <p>{item.itemDetail || "상품 설명이 없습니다."}</p>
  </div>
);

export default ItemDescriptionSection;