import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ItemReviewSection.css';

const ItemReviewSection = ({ reviews }) => {
  const navigate = useNavigate();

  const handleImageClick = (reviewId) => {
    navigate(`/review/detail/${reviewId}`);
  };

  return (
    <div className="item-review-section">
      {reviews && reviews.length > 0 ? (
        reviews.flatMap(review =>
          review.images && review.images.map(image => (
            <div
              className="box"
              key={image.imageId}
              onClick={() => handleImageClick(review.reviewId)}
            >
              <img
                className="clickImage"
                src={`http://localhost:9000/view/${image.fileName}`}
                alt={`리뷰 이미지 ${image.imageId}`}
              />
            </div>
          ))
        )
      ) : (
        <p>아직 후기가 없습니다.</p>
      )}
    </div>
  );
};

export default ItemReviewSection;