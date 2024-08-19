import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SubCategoryList.css';

const SubCategoryList = ({ parentId, onSubCategoryClick }) => {
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/category/subCategorylist?parentId=${parentId}`);
        setSubCategories(response.data);
      } catch (error) {
        console.error('하위 카테고리 가져오기 오류:', error.response || error);
        setError(`하위 카테고리 가져오기 실패: ${error.response?.data?.message || error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    if (parentId) {
      fetchSubCategories();
    }
  }, [parentId]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div className="sub-categories">
      <ul>
        {subCategories.map((subCategory) => (
          <li
            key={subCategory.categoryId}
            className="sub-category-item"
            onClick={() => onSubCategoryClick(subCategory.categoryId)}
          >
            {subCategory.categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategoryList;