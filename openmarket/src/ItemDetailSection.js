import React from 'react';
import './ItemDetailSection.css'

const ItemDetailSection = ({ item }) => (
 <div className="item-detail-section">
    <div className="detail-image-list">
      {item.images && item.images.map((image, index) => (
        <img key={index} src={`/view/${image.fullName}`} alt={`상품 이미지 ${index + 1}`} className="item-detail-image" />
      ))}
    </div>
  </div>
//    <div class="container">
//       <div class="box">
//         <img class="clickImage" src="./image/1.jpg"/>
//       </div>
);

export default ItemDetailSection;