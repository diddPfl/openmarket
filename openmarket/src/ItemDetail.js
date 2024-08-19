import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import ItemDetailSection from "./ItemDetailSection";
import ItemDescriptionSection from "./ItemDescriptionSection";
import ItemReviewSection from "./ItemReviewSection";
import ItemQnASection from "./ItemQnASection";
import "./ItemDetail.css";

function ItemDetail() {
  const [item, setItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgBoxRef = useRef(null);
  const [activeSection, setActiveSection] = useState('detail');

  const navigate = useNavigate();

  useEffect(() => {
    fetchItemById(id);
    fetchReviewsById(id);
  }, [id]);

  const fetchItemById = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:9000/items/${itemId}`);
      console.log('Fetched item data:', response.data);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item details:', error);
      setError('아이템 정보를 가져오는데 실패했습니다. 나중에 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewsById = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:9000/review/${itemId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const getImageUrl = (image) => {
    return `http://localhost:9000/view/${image.fullName}`;
  };

  const slide = (direction) => {
    if (!item || !item.images || item.images.length <= 1) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = item.images.length - 1;
    } else if (newIndex >= item.images.length) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    if (imgBoxRef.current) {
      imgBoxRef.current.style.transform = `translateX(-${newIndex * 100}%)`;
    }
  };

  const handleSectionChange = (section, event) => {
    event.preventDefault();
    setActiveSection(section);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!item) return <div>아이템을 찾을 수 없습니다.</div>;

  return (
    <div className="page-container">
      <Header />
      <div className="aaa">
        <div className="item-container">
          <div className={`slider-container ${item.itemSellStatus === 'SOLD_OUT' ? 'sold-out' : ''}`}>
            {item.itemSellStatus === 'SOLD_OUT' && (
              <div className="sold-out-overlay">
                <span className="sold-out-text">Sold Out</span>
              </div>
            )}
            {item.images && item.images.length > 1 && (
              <i className="fa-solid fa-angle-left" onClick={() => slide(-1)}></i>
            )}
            <div className="img-box" ref={imgBoxRef}>
              {item.images && item.images.map((image, index) => (
                <img
                  key={index}
                  src={getImageUrl(image)}
                  alt={`아이템 이미지 ${index + 1}`}
                  onError={(e) => {
                    console.error(`Failed to load image: ${image.fullName}`);
                    e.target.src = '/path/to/fallback/image.jpg';
                  }}
                />
              ))}
            </div>
            {item.images && item.images.length > 1 && (
              <i className="fa-solid fa-angle-right" onClick={() => slide(1)}></i>
            )}
          </div>
          <div className="item-info">
            <div className="item-name">
              <h1>{item.itemName}</h1>
            </div>
            <div className="item-detail">
              <p>{item.itemDetail}</p>
            </div>
            <div className="item-detail-info">
              <dl className="sell-status">
                <dt>판매상태</dt>
                <dd>{item.itemSellStatus}</dd>
              </dl>
              <dl className="category-name">
                <dt>카테고리</dt>
                <dd>{item.categoryName}</dd>
              </dl>
              <dl className="model-number">
                <dt>모델번호</dt>
                <dd>{item.gubunSubCode}</dd>
              </dl>
              <dl className="item-id">
                <dt>상품 번호</dt>
                <dd>{item.itemId}</dd>
              </dl>
              <dl className="reg-date">
                <dt>상품 등록일</dt>
                <dd>{item.regdate}</dd>
              </dl>
            </div>
            <div className="item-price">
              <h1>{item.price.toLocaleString()}원</h1>
            </div>
            <div className="button-box">
              <div className="purchase-btn">
                <button>구매</button>
              </div>
              <div className="sell-btn">
                <button>판매</button>
              </div>
            </div>
            <div className="call-dibs">
              <button>위시리스트</button>
            </div>
            <div className="back-btn" onClick={handleBackClick}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
          </div>
        </div>
        <div className="item-descript">
          <div className="item-menu">
            <a href="#" onClick={(e) => handleSectionChange('detail', e)} className={activeSection === 'detail' ? 'active' : ''}>상품 상세</a>
            <a href="#" onClick={(e) => handleSectionChange('description', e)} className={activeSection === 'description' ? 'active' : ''}>상품 설명</a>
            <a href="#" onClick={(e) => handleSectionChange('review', e)} className={activeSection === 'review' ? 'active' : ''}>상품 후기</a>
            <a href="#" onClick={(e) => handleSectionChange('qna', e)} className={activeSection === 'qna' ? 'active' : ''}>상품 Q&A</a>
          </div>
          <div className="section-content">
            {activeSection === 'detail' && <ItemDetailSection item={item} />}
            {activeSection === 'description' && <ItemDescriptionSection item={item} />}
            {activeSection === 'review' && <ItemReviewSection reviews={reviews} />}
            {activeSection === 'qna' && <ItemQnASection />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;