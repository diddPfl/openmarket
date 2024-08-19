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

 /* 날짜 계산하는 함수 */
  const getTimeDifference = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffTime = now - past;
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) return `${diffSeconds}초 전`;
    if (diffMinutes < 60) return `${diffMinutes}분 전`;
    if (diffHours < 24) return `${diffHours}시간 전`;
    if (diffDays < 7) return `${diffDays}일 전`;
    if (diffWeeks < 4) return `${diffWeeks}주 전`;
    if (diffMonths < 12) return `${diffMonths}개월 전`;
    return `${diffYears}년 전`;
  };

  const handleItemClick = (itemId) => {
      navigate(`/item/${itemId}`);
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

        <div className="user-box">
        <div className="user-info">
        <p><strong>{review.memberName}</strong></p>
        <p className="review-regdate">{getTimeDifference(review.regdate)}</p>
        </div>
        </div>
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
                            src={`http://localhost:9000/view/${review.item.images[0].fullName}`}
                            alt={review.item.itemName}
                            className="item-tag-image"
                            onClick={() => handleItemClick(review.item.itemId)}
                            style={{ cursor: 'pointer' }}
                          />
                          <div className="item-tag-info">
                            <p className="item-tag-name">{review.item.itemName}</p>
                            <p className="item-tag-price">{review.item.price.toLocaleString()}원</p>
                          </div>
                        </>
                      )}
                    </div>
          <div className="review-content">
            <p>{review.content}</p>
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