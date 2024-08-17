import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CategoryList.css';

const CategoryItemList = ({ categoryId, gubunSubCode }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      try {
        let response;
        if (categoryId) {
          response = await axios.get(`/api/categoryitems/byCategory/${categoryId}`);
        } else if (gubunSubCode) {
          response = await axios.get(`/api/categoryitems/byGubun/${gubunSubCode}`);
        } else {
          throw new Error('카테고리 ID 또는 구분 서브 코드가 필요합니다.');
        }
        setItems(response.data);
      } catch (error) {
        console.error('아이템 가져오기 오류:', error);
        setError('아이템 가져오기 실패');
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId || gubunSubCode) {
      fetchItems();
    }
  }, [categoryId, gubunSubCode]);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (items.length === 0) return <div>해당 카테고리의 상품이 없습니다.</div>;

  return (
    <div className="items">
      {items.map((item) => (
        <div key={item.itemId} className="item">
          <h3>{item.itemName}</h3>
          <p>{item.itemDetail}</p>
          <p>가격: {item.price}원</p>
          {item.brand && <p>브랜드: {item.brand}</p>}
        </div>
      ))}
    </div>
  );
};

export default CategoryItemList;