import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]); // 상위 카테고리 상태
  const [subCategories, setSubCategories] = useState([]); // 하위 카테고리 상태
  const [activeMenu, setActiveMenu] = useState(null); // 활성 메뉴 상태
  const [activeCategory, setActiveCategory] = useState(null); // 활성 카테고리 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/category/list');
        setCategories(response.data); // 상위 카테고리 데이터 설정
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
      setActiveMenu(null); // 동일한 메뉴 클릭 시 닫기
    } else {
      setActiveMenu(menuType);
      if (menuType === 'allCategories') {
        setActiveCategory(null); // 전체 카테고리를 클릭하면 활성 카테고리 초기화
      }
    }
  };

  const handleCategoryClick = async (categoryId) => {
    // 활성 카테고리 토글
    if (activeCategory === categoryId) {
      setActiveCategory(null); // 동일한 카테고리를 클릭하면 닫기
      setSubCategories([]); // 하위 카테고리 초기화
    } else {
      setActiveCategory(categoryId);
      try {
        const response = await axios.get(`/category/subCategorylist?parentId=${categoryId}`);
        setSubCategories(response.data); // 하위 카테고리 데이터 설정
      } catch (error) {
        console.error('서브 카테고리 가져오기 오류:', error);
      }
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="category-container">
      <div className="menu-bar">
        <div className={`menu-item ${activeMenu === 'allCategories' ? 'active-menu' : ''}`} onClick={() => handleMenuClick('allCategories')}>전체카테고리</div>
        <div className={`menu-item ${activeMenu === 'popular' ? 'active-menu' : ''}`} onClick={() => handleMenuClick('popular')}>인기</div>
        <div className={`menu-item ${activeMenu === 'new' ? 'active-menu' : ''}`} onClick={() => handleMenuClick('new')}>신상품</div>
        <div className={`menu-item ${activeMenu === 'specialPrice' ? 'active-menu' : ''}`} onClick={() => handleMenuClick('specialPrice')}>특가</div>
      </div>
      {activeMenu === 'allCategories' && (
        <div className="category-display">
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
          {activeCategory && (
            <div className="sub-categories">
              {subCategories.map((subCategory) => (
                <div key={subCategory.categoryId} className="sub-category-item">
                  {subCategory.categoryName}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryList;