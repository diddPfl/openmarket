import React from 'react';

const ItemReviewSection = ({ reviews }) => (
  <div className="item-review-section">
    <h2>상품 후기</h2>
    {reviews.length > 0 ? (
      <ul>
        {reviews.map((review) => (
          <li key={review.reviewId}>
            <p>평점: {review.rating}</p>
            <p>내용: {review.content}</p>
            <p>작성자: {review.memberName}</p>
            <p>작성일: {review.regdate}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>아직 후기가 없습니다.</p>
    )}
  </div>
);

export default ItemReviewSection;