import React from 'react';
import './ItemDetailSection.css'

const ItemDetailSection = ({ item }) => (
 <div className="item-detail-section">
    <div className="image-list">
      {item.images && item.images.map((image, index) => (
        <img key={index} src={`/view/${image.fileName}`} alt={`상품 이미지 ${index + 1}`} className="item-image" />
      ))}
    </div>
  </div>
//    <div class="container">
//       <div class="box">
//         <img class="clickImage" src="./image/1.jpg"/>
//       </div>
);

export default ItemDetailSection;