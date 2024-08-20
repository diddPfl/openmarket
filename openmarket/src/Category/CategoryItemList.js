import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CategoryItemList.css';

const CategoryItemList = () => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { categoryId, gubunSubCode } = useParams();

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

    fetchItems();
  }, [categoryId, gubunSubCode]);

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류: {error}</div>;
  if (items.length === 0) return <div>해당 카테고리의 상품이 없습니다.</div>;

  return (
    <div className="items">
      {items.map((item) => (
        <div key={item.itemId} className="item" onClick={() => handleItemClick(item.itemId)}>
          <h3>{item.itemName}</h3>
          <p>{item.itemDetail}</p>
          <p>가격: {item.price}원</p>
          {item.brand && <p>브랜드: {item.brand}</p>}
          <div className="img-box">
            {item.images && item.images.map((image) => (
              <img key={image.uuid} src={`/Library/filetest/upload/${image.fileName}`} alt={`아이템 이미지`} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryItemList;