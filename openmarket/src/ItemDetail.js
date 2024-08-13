import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "./Header";
import ItemDetailSection from "./ItemDetailSection";
import ItemDescriptionSection from "./ItemDescriptionSection";
import ItemReviewSection from "./ItemReviewSection";
import ItemQnASection from "./ItemQnASection";
import "./ItemDetail.css";

function ItemDetail() {
  // 상태 관리를 위한 useState 훅 사용
  const [item, setItem] = useState(null); // 아이템 정보를 저장할 상태
  const [reviews, setReviews] = useState([]); // 리뷰 정보를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태를 관리
  const [error, setError] = useState(null); // 에러 상태를 관리
  const { id } = useParams(); // URL 파라미터에서 아이템 ID를 가져옴
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 이미지 슬라이드 인덱스
  const imgBoxRef = useRef(null); // 이미지 슬라이더 DOM 요소 참조
  const [activeSection, setActiveSection] = useState('detail'); // 현재 활성화된 섹션

  // 컴포넌트가 마운트되거나 id가 변경될 때 아이템 정보와 리뷰를 가져옴
  useEffect(() => {
    fetchItemById(id);
    fetchReviewsById(id);
  }, [id]);

  // 아이템 정보를 서버에서 가져오는 비동기 함수
  const fetchItemById = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:9000/items/${itemId}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item details:', error);
      setError('아이템 정보를 가져오는데 실패했습니다. 나중에 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // 리뷰 정보를 서버에서 가져오는 비동기 함수
  const fetchReviewsById = async (itemId) => {
    try {
      const response = await axios.get(`http://localhost:9000/review/${itemId}`);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // 리뷰 가져오기 실패 시 에러 처리
    }
  };

  // 이미지 슬라이드 기능을 구현하는 함수
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

  // 섹션 변경 함수 (페이지 이동 방지)
  const handleSectionChange = (section, event) => {
    event.preventDefault(); // 기본 동작 방지
    setActiveSection(section);
  };

  // 로딩 중일 때 표시할 내용
  if (loading) return <div>로딩 중...</div>;
  // 에러가 발생했을 때 표시할 내용
  if (error) return <div>에러: {error}</div>;
  // 아이템이 없을 때 표시할 내용
  if (!item) return <div>아이템을 찾을 수 없습니다.</div>;

  return (
    <div>
      <Header />
      <div className="item-container">
        <div className="slider-container">
          {/* 이미지가 2개 이상일 때만 왼쪽 화살표 표시 */}
          {item.images && item.images.length > 1 && (
            <i className="fa-solid fa-angle-left" onClick={() => slide(-1)}></i>
          )}
          <div className="img-box" ref={imgBoxRef}>
            {/* 아이템 이미지 표시 */}
            {item.images && item.images.map((image, index) => (
              <img key={index} src={`/view/${image.fileName}`} alt={`아이템 이미지 ${index + 1}`} />
            ))}
          </div>
          {/* 이미지가 2개 이상일 때만 오른쪽 화살표 표시 */}
          {item.images && item.images.length > 1 && (
            <i className="fa-solid fa-angle-right" onClick={() => slide(1)}></i>
          )}
        </div>
        <div className="item-info">
          {/* 아이템 이름 표시 */}
          <div className="item-name">
            <h1>{item.itemName}</h1>
          </div>
          {/* 아이템 상세 정보 표시 */}
          <div className="item-detail">
            <p>{item.itemDetail}</p>
          </div>
          {/* 아이템 세부 정보 표시 */}
          <div className="item-detail-info">
            <dl className="sell-status">
              <dt>판매상태</dt>
              <dd>#</dd>
            </dl>
            <dl className="model-number">
              <dt>모델번호</dt>
              <dd>#</dd>
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
          {/* 아이템 가격 표시 */}
          <div className="item-price">
            <h1>{item.price}원</h1>
          </div>
          {/* 구매 및 판매 버튼 */}
          <div className="button-box">
            <div className="purchase-btn">
              <button>구매</button>
            </div>
            <div className="sell-btn">
              <button>판매</button>
            </div>
          </div>
          {/* 위시리스트 버튼 */}
          <div className="call-dibs">
            <button>위시리스트</button>
          </div>
          {/* 아이템 카테고리 표시 */}
          <div className="item-category">
            <p>{item.categoryName}</p>
          </div>
        </div>
      </div>
      {/* 아이템 상세 정보 섹션 */}
      <div className="item-descript">
        {/* 상세 정보 메뉴 */}
        <div className="item-menu">
          <a href="#" onClick={(e) => handleSectionChange('detail', e)} className={activeSection === 'detail' ? 'active' : ''}>상품 상세</a>
          <a href="#" onClick={(e) => handleSectionChange('description', e)} className={activeSection === 'description' ? 'active' : ''}>상품 설명</a>
          <a href="#" onClick={(e) => handleSectionChange('review', e)} className={activeSection === 'review' ? 'active' : ''}>상품 후기</a>
          <a href="#" onClick={(e) => handleSectionChange('qna', e)} className={activeSection === 'qna' ? 'active' : ''}>상품 Q&A</a>
        </div>
        {/* 선택된 섹션에 따라 해당 컴포넌트 렌더링 */}
        <div className="section-content">
          {activeSection === 'detail' && <ItemDetailSection item={item} />}
          {activeSection === 'description' && <ItemDescriptionSection item={item} />}
          {activeSection === 'review' && <ItemReviewSection reviews={reviews} />}
          {activeSection === 'qna' && <ItemQnASection />}
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;