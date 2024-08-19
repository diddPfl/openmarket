import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryItemList from './CategoryItemList'; // CategoryItemList 컴포넌트 임포트
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const menuItems = [
    { type: 'allCategories', name: '전체카테고리', gubunSubCode: 'ITGU01' },
    { type: 'popular', name: '인기', gubunSubCode: 'ITGU02' },
    { type: 'new', name: '신상품', gubunSubCode: 'ITGU03' },
    { type: 'specialPrice', name: '특가', gubunSubCode: 'ITGU04' },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/category/list');
        console.log('API 응답:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('카테고리 가져오기 오류:', error);
        setError('카테고리 가져오기 실패');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleMenuClick = (menuType) => {
    if (activeMenu === menuType) {
      setActiveMenu(null);
      setActiveCategory(null);
    } else {
      setActiveMenu(menuType);
      setActiveCategory(null);
    }
  };

  const handleCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
    } else {
      setActiveCategory(categoryId);
    }
  };

  const resetCategoryState = () => {
    setActiveMenu(null);
    setActiveCategory(null);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="category-container">
      <div className="menu-bar">
        {menuItems.map((item) => (
          <div
            key={item.type}
            className={`menu-item ${activeMenu === item.type ? 'active-menu' : ''}`}
            onClick={() => handleMenuClick(item.type)}
          >
            {item.name}
          </div>
        ))}
      </div>
      {activeMenu === 'allCategories' && (
        <div className="main-categories">
          {categories.map((category) => (
            <div
              key={category.categoryId}
              className={`category-item ${activeCategory === category.categoryId ? 'active-category' : ''}`}
              onClick={() => handleCategoryClick(category.categoryId)}
            >
              {category.categoryName}
            </div>
          ))}
        </div>
      )}
      {(activeCategory || activeMenu) && (
        <CategoryItemList
          categoryId={activeCategory}
          gubunSubCode={menuItems.find(item => item.type === activeMenu)?.gubunSubCode}
          resetCategoryState={resetCategoryState} // 아이템 클릭 시 카테고리 상태 초기화
        />
      )}
    </div>
  );
};

export default CategoryList;