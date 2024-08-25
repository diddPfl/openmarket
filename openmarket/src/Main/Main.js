import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
import MainImageSlider from './MainImageSlider';

// 메뉴 항목 정의
const menuItems = [
  { type: 'allCategories', name: '전체카테고리', gubunSubCode: 'ITGU01' },
  { type: 'popular', name: '인기', gubunSubCode: 'ITGU02' },
  { type: 'new', name: '신상품', gubunSubCode: 'ITGU03' },
  { type: 'specialPrice', name: '특가', gubunSubCode: 'ITGU04' },
];

const MainPage = () => {
  const [items, setItems] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

useEffect(() => {
  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const fetchedItems = {};
      for (const menuItem of menuItems) {
        if (menuItem.type !== 'allCategories') {
          try {
            const response = await axios.get(`/api/categoryitems/byGubun/${menuItem.gubunSubCode}?limit=5`);
            // 받아온 데이터를 아이템 아이디 기준 내림차순으로 정렬
            const sortedItems = Array.isArray(response.data)
              ? response.data.sort((a, b) => b.itemId - a.itemId)
              : [];
            fetchedItems[menuItem.type] = sortedItems;
          } catch (error) {
            console.error(`Error fetching ${menuItem.type} items:`, error);
            fetchedItems[menuItem.type] = [];
          }
        }
      }
      setItems(fetchedItems);
    } catch (error) {
      console.error('아이템 가져오기 오류:', error);
      setError('아이템 가져오기 실패');
    } finally {
      setIsLoading(false);
    }
  };

  fetchItems();
}, []);

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const handleViewAllClick = (gubunSubCode) => {
    navigate(`/categoryitems/gubun/${gubunSubCode}`);
  };

  // 이미지 URL 생성 함수
  const getImageUrl = (image) => {
    return `http://localhost:9000/view/${image.fileName}`;
  };

  if (isLoading) return <div>로딩 중입니다. 잠시만 기다려 주세요...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="main-page-container">
      <MainImageSlider />

      {menuItems.map((menuItem) => (
        menuItem.type !== 'allCategories' && (
          <div className="main-page-items-section" key={menuItem.type}>
            <div className="main-page-section-header">
              <h2>{menuItem.name}</h2>
              <button className="main-page-view-all-button" onClick={() => handleViewAllClick(menuItem.gubunSubCode)}>
                전체보기 &gt;
              </button>
            </div>
            <div className="main-page-items">
              {Array.isArray(items[menuItem.type]) && items[menuItem.type].slice(0, 10).map((item) => ( // 10개 아이템만 표시
                <div key={item.itemId} className="main-page-item" onClick={() => handleItemClick(item.itemId)}>
                  <div className="img-box">
                    {item.images && item.images.length > 0 && (
                      <img src={getImageUrl(item.images[0])} alt={`아이템 이미지 - ${item.itemName}`} />
                    )}
                  </div>
                  <div className="brand-and-icons">
                    {item.brand && <p className="main-page-item-brand">{item.brand}</p>}
                    <div className="icon-container">
                      <i className="fas fa-heart icon" title="좋아요"></i>
                      <i className="fas fa-shopping-cart icon" title="장바구니"></i>
                    </div>
                  </div>
                  <h3 className="main-page-item-name">{item.itemName}</h3>
                  <p className="main-page-item-price">{item.price.toLocaleString()}원</p>
                </div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default MainPage;