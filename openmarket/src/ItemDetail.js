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
  const [showModal, setShowModal] = useState(false);
  const [relatedItems, setRelatedItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchItemById(id);
      await fetchReviewsById(id);
      await fetchRelatedItems(id);
    };
    fetchData();
  }, [id]);

  const fetchItemById = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:9000/items/${itemId}`);
      const fetchedItem = response.data;

      // Sort images to put repimg=1 first
      if (fetchedItem.images && fetchedItem.images.length > 0) {
        fetchedItem.images.sort((a, b) => (b.repimg || 0) - (a.repimg || 0));
      }

      setItem(fetchedItem);
    } catch (error) {
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

  const fetchRelatedItems = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:9000/items/${itemId}/related`);
      setRelatedItems(response.data);
    } catch (error) {
      console.error('Error fetching related items:', error);
    }
  };

  const getImageUrl = (image) => {
    return `http://localhost:9000/view/${image.fullName}`;
  };

  const getRepimgImage = (images) => {
    const repimgImage = images.find(image => image.repimg === 1);
    return repimgImage ? getImageUrl(repimgImage) : '/path/to/fallback/image.jpg'; // Provide a fallback image
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

  const handleDisableItem = async () => {
    try {
      const response = await axios.put(`http://localhost:9000/items/${id}/disabled`);
      if (response.status === 200) {
        setItem((prevItem) => ({ ...prevItem, isDisabled: 1 }));
        alert('Item has been disabled');
      } else {
        throw new Error('Failed to disable the item');
      }
    } catch (error) {
      console.error('Error disabling item:', error);
      alert('Failed to disable the item');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!item) return <div>아이템을 찾을 수 없습니다.</div>;

  return (
    <div className="item-detail-page">
      <Header />
      <div className="item-detail-content">
        <div className="item-detail-container">
          <div className={`item-slider-container ${item.itemSellStatus === 'SOLD_OUT' ? 'sold-out' : ''}`}>
            {item.itemSellStatus === 'SOLD_OUT' && (
              <div className="sold-out-overlay">
                <span className="sold-out-text">Sold Out</span>
              </div>
            )}
            {item.images && item.images.length > 1 && (
              <i className="fa-solid fa-angle-left" onClick={() => slide(-1)}></i>
            )}
            <div className="item-image-box" ref={imgBoxRef}>
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
            <div className="item-detail-name">
              <h1 className="detail-item-name">{item.itemName}</h1>
            </div>
            <div className="item-detail-description">
              <p>{item.itemDetail}</p>
            </div>
            <div className="item-detail-info">
              <dl className="item-sell-status">
                <dt>판매상태</dt>
                <dd>{item.itemSellStatus}</dd>
              </dl>
              <dl className="item-category">
                <dt>카테고리</dt>
                <dd>{item.categoryName}</dd>
              </dl>
              <dl className="item-model-number">
                <dt>모델번호</dt>
                <dd>{item.gubunSubCode}</dd>
              </dl>
              <dl className="item-id">
                <dt>상품 번호</dt>
                <dd>{item.itemId}</dd>
              </dl>
              <dl className="item-reg-date">
                <dt>상품 등록일</dt>
                <dd>{item.regdate}</dd>
              </dl>
            </div>
            <div className="item-price">
              <h1>{item.price.toLocaleString()}원</h1>
            </div>
            {item.isDisabled !== 1 ? (
              <div className="button-box">
                <div className="purchase-button">
                  <button><p>구매</p></button>
                </div>
                <div className="sell-button">
                  <button><p>판매</p></button>
                </div>
              </div>
            ) : null}
            {item.isDisabled === 1 && (
              <div>
                <h2>비활성화됨</h2>
              </div>
            )}
            <div className="call-dibs">
              <button><p>위시리스트</p></button>
            </div>
            <div className="abc">
              <div className="shipping-info">
                <span className="shipping-title">배송비 안내</span>
                <span className="shipping-more" onClick={() => setShowModal(true)}>더보기</span>
              </div>
              <p>테스트입니다.</p>
            </div>

            {showModal && (
              <div className="modal-overlay" onClick={() => setShowModal(false)}>
                <div className="modal-content" onClick={e => e.stopPropagation()}>
                  <button className="modal-close" onClick={() => setShowModal(false)}>&times;</button>
                  <h2>배송 정보</h2>
                  <p>상세한 배송 정보 내용...</p>
                </div>
              </div>
            )}
            <h3 className="aadd">관련 상품</h3>
            <div className="related-items">
              {relatedItems.length > 0 && (
                <div className="related-items-grid">
                  {relatedItems.map(relatedItem => (
                    <div key={relatedItem.itemId} className="related-item">
                      <img src={getRepimgImage(relatedItem.images)} alt={relatedItem.itemName} />
                      <div>
                      <p>{relatedItem.itemName}</p>
                      <p className="relatedItem-price">{relatedItem.price ? `${relatedItem.price.toLocaleString()}원` : '가격 정보 없음'}</p>
                      </div>
                    </div>

                  ))}
                </div>
              )}
            </div>
            <div className="back-button" onClick={handleBackClick}>
              <i className="fa-solid fa-arrow-left"></i>
            </div>
          </div>
        </div>
        <div className="item-description">
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
