import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

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
              fetchedItems[menuItem.type] = Array.isArray(response.data) ? response.data : [];
            } catch (error) {
              console.error(`Error fetching ${menuItem.type} items:`, error);
              fetchedItems[menuItem.type] = []; // Set to empty array on error
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
  const getImageUrl = (fileName) => {
    return `/Library/filetest/upload/${fileName}`;
  };

  if (isLoading) return <div>로딩 중입니다. 잠시만 기다려 주세요...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="main-page">
      <div className="image-container">
        <img src="/Library/filetest/upload/main-img.jpg" alt="메인 이미지" />
      </div>

      {menuItems.map((menuItem) => (
        menuItem.type !== 'allCategories' && (
          <div className="items-section" key={menuItem.type}>
            <div className="section-header">
              <h2>{menuItem.name}</h2>
              <button className="view-all-button" onClick={() => handleViewAllClick(menuItem.gubunSubCode)}>
                전체보기 &gt;
              </button>
            </div>
            <div className="items">
              {Array.isArray(items[menuItem.type]) && items[menuItem.type].map((item) => (
                <div key={item.itemId} className="item" onClick={() => handleItemClick(item.itemId)}>
                  <h3>{item.itemName}</h3>
                  <p>가격: {item.price}원</p>
                  {item.images && item.images[0] && (
                    <img src={getImageUrl(item.images[0].fileName)} alt={item.itemName} />
                  )}
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