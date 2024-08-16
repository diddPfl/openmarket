import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from "./Header";
import './ReviewDetail.css'

const ReviewDetail = () => {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgBoxRef = useRef(null);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:9000/review/detail/${reviewId}`);
        if (response.data) {
          setReview(response.data);
        } else {
          setError('리뷰 데이터가 없습니다.');
        }
      } catch (error) {
        console.error('리뷰를 불러오는데 실패했습니다:', error);
        setError('리뷰를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [reviewId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const slide = (direction) => {
    if (!review || !review.images || review.images.length <= 1) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = review.images.length - 1;
    } else if (newIndex >= review.images.length) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    if (imgBoxRef.current) {
      imgBoxRef.current.style.transform = `translateX(-${newIndex * 100}%)`;
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;
  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

  return (
    <div className="review-page-container">
      <Header />
      <div className="review-detail-container">
        <div className="review-content-wrapper">
          <div className="review-slider-container">
            {review.images && review.images.length > 1 && (
              <i className="fa-solid fa-angle-left" onClick={() => slide(-1)}></i>
            )}
            <div className="review-img-box" ref={imgBoxRef}>
              {review.images && review.images.map((image, index) => (
                <img
                  key={image.imageId}
                  src={`http://localhost:9000/view/${image.fileName}`}
                  alt={`리뷰 이미지 ${image.imageId}`}
                />
              ))}
            </div>
            {review.images && review.images.length > 1 && (
              <i className="fa-solid fa-angle-right" onClick={() => slide(1)}></i>
            )}
          </div>
          <div className="item-tag">
                      {review.item && (
                        <>
                          <img
                            src={`http://localhost:9000/view/${review.item.images[0].fileName}`}
                            alt={review.item.itemName}
                            className="item-tag-image"
                          />
                          <div className="item-tag-info">
                            <p className="item-tag-name">{review.item.itemName}</p>
                            <p className="item-tag-price">{review.item.price.toLocaleString()}원</p>
                          </div>
                        </>
                      )}
                    </div>
          <div className="review-content">
            <h2>리뷰 상세</h2>
            <p><strong>작성자:</strong> {review.memberName}</p>
            <p><strong>작성일:</strong> {new Date(review.regdate).toLocaleDateString()}</p>
            <p><strong>내용:</strong> {review.content}</p>
          </div>
        </div>
        <button className="back-btn" onClick={handleGoBack}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
      </div>
    </div>
  );
};

export default ReviewDetail;