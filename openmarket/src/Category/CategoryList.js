import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCategoryListVisible, setIsCategoryListVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { type: 'allCategories', name: '카테고리', gubunSubCode: 'ITGU01' },
    { type: 'popular', name: '인기', gubunSubCode: 'ITGU02' },
    { type: 'new', name: '신상품', gubunSubCode: 'ITGU03' },
    { type: 'specialPrice', name: '특가', gubunSubCode: 'ITGU04' },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/category/list');

        // 응답 데이터가 배열인지 확인
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          setCategories([]); // 배열이 아닐 경우 빈 배열로 설정
          console.error('API 응답이 배열이 아닙니다:', response.data);
        }
      } catch (error) {
        console.error('카테고리 가져오기 오류:', error);
        setError('카테고리 가져오기 실패');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Close category list when location changes
    setIsCategoryListVisible(false);
  }, [location]);

  const handleMenuClick = (gubunSubCode) => {
    if (gubunSubCode === 'ITGU01') {
      setIsCategoryListVisible((prev) => !prev);
    } else {
      navigate(`/categoryitems/gubun/${gubunSubCode}`);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory(null);
      setSubCategories([]);
    } else {
      setActiveCategory(categoryId);
      try {
        const response = await axios.get(`/api/category/subCategorylist?parentId=${categoryId}`);
        setSubCategories(response.data);
      } catch (error) {
        console.error('서브 카테고리 가져오기 오류:', error);
      }
    }
  };

  const handleSubCategoryClick = (categoryId) => {
    navigate(`/categoryitems/category/${categoryId}`);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

return (
  <div className="category-list-container">
    <div className="category-list-menu-bar">
      {menuItems.map((item) => (
        <div
          key={item.type}
          className="category-list-menu-item"
          onClick={() => handleMenuClick(item.gubunSubCode)}
        >
          {item.name}
        </div>
      ))}
    </div>
    {isCategoryListVisible && (
      <div className="category-list-display">
        <div className="category-list-main-categories">
          {Array.isArray(categories) && categories.map((category) => (
            <div
              key={category.categoryId}
              className={`category-list-item ${activeCategory === category.categoryId ? 'category-list-active-category' : ''}`}
              onClick={() => handleCategoryClick(category.categoryId)}
            >
              {category.categoryName}
            </div>
          ))}
        </div>
        {activeCategory && (
          <div className="category-list-sub-categories">
            {subCategories.map((subCategory) => (
              <div
                key={subCategory.categoryId}
                className="category-list-sub-category-item"
                onClick={() => handleSubCategoryClick(subCategory.categoryId)}
              >
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