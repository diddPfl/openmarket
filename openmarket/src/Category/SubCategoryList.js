import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchSubCategories = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/category/subCategorylist?parentId=${id}`);
        setSubCategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error);
        setError('Failed to fetch subcategories');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubCategories();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>서브 카테고리</h2>
      <ul>
        {subCategories.map((subCategory) => (
          <li key={subCategory.categoryId}>{subCategory.categoryName}</li>
        ))}
      </ul>
    </div>
  );
};

export default SubCategoryList;