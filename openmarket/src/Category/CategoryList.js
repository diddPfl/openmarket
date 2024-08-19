import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SubCategoryList from './SubCategoryList';
import './CategoryList.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    { type: 'allCategories', name: '카테고리', gubunSubCode: 'ITGU01' },
    { type: 'popular', name: '인기', gubunSubCode: 'ITGU02' },
    { type: 'new', name: '신상품', gubunSubCode: 'ITGU03' },
    { type: 'specialPrice', name: '특가', gubunSubCode: 'ITGU04' },
  ];

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('/api/category/list');
      setCategories(response.data);
    } catch (error) {
      console.error('카테고리 가져오기 오류:', error);
      setError('카테고리 가져오기 실패');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuClick = (menuItem) => {
    if (menuItem.type === 'allCategories') {
      setShowCategories(!showCategories);
      if (!categories.length && !showCategories) {
        fetchCategories();
      }
    } else {
      setShowCategories(false);
      navigate(`/categoryitems/gubun/${menuItem.gubunSubCode}`);
    }
  };

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    navigate(`/categoryitems/category/${categoryId}`);
  };

  const handleSubCategoryClick = (subCategoryId) => {
    navigate(`/categoryitems/category/${subCategoryId}`);
  };

  return (
    <div className="category-container">
      <div className="menu-bar">
        {menuItems.map((item) => (
          <div
            key={item.type}
            className={`menu-item ${showCategories && item.type === 'allCategories' ? 'active' : ''}`}
            onClick={() => handleMenuClick(item)}
          >
            {item.name}
          </div>
        ))}
      </div>
      {showCategories && (
        <div className="main-categories">
          {isLoading ? (
            <div>로딩 중...</div>
          ) : error ? (
            <div>오류: {error}</div>
          ) : (
            categories.map((category) => (
              <div key={category.categoryId}>
                <div
                  className={`category-item ${activeCategory === category.categoryId ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.categoryId)}
                >
                  {category.categoryName}
                </div>
                <SubCategoryList
                  parentId={category.categoryId}
                  onSubCategoryClick={handleSubCategoryClick}
                />
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryList;