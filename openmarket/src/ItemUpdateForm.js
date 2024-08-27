import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ItemUpdateForm.css';

const ItemUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    itemName: '',
    itemDetail: '',
    price: '',
    stockNumber: '',
    brand: '',
    categoryId: '',
    itemSellStatus: '',
    gubunSubCode: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/items/${id}/edit`);
        if (!response.ok) {
          throw new Error('상품 정보를 불러오는데 실패했습니다');
        }
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('상품 정보 불러오기 오류:', error);
        setErrors({ fetch: '상품 정보를 불러오는데 실패했습니다' });
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: value,
    }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!item.itemName.trim()) newErrors.itemName = '상품명을 입력해주세요';
    if (!item.itemDetail.trim()) newErrors.itemDetail = '상품 상세 설명을 입력해주세요';
    if (!item.price || isNaN(item.price) || Number(item.price) <= 0) {
      newErrors.price = '유효한 가격을 입력해주세요';
    }
    if (!item.stockNumber || isNaN(item.stockNumber) || Number(item.stockNumber) < 0) {
      newErrors.stockNumber = '유효한 재고 수량을 입력해주세요';
    }
    if (!item.brand.trim()) newErrors.brand = '브랜드를 입력해주세요';
    if (!item.categoryId || isNaN(item.categoryId)) newErrors.categoryId = '유효한 카테고리 ID를 입력해주세요';
    if (!item.itemSellStatus) newErrors.itemSellStatus = '판매 상태를 선택해주세요';
    if (!item.gubunSubCode.trim()) newErrors.gubunSubCode = '구분 서브 코드를 입력해주세요';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch(`/items/${id}/edit`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
        if (!response.ok) {
          throw new Error('상품 수정에 실패했습니다');
        }
        navigate(`/item/${id}`);
      } catch (error) {
        console.error('상품 수정 오류:', error);
        setErrors({ submit: '상품 수정에 실패했습니다. 다시 시도해주세요.' });
      }
    }
  };

  if (loading) {
    return <div className="loading">로딩 중...</div>;
  }

  return (
    <div className="item-update-container">
      <h2 className="form-title">상품 수정</h2>
      <form onSubmit={handleSubmit} className="item-update-form">
        <div className="form-group">
          <label htmlFor="itemName">상품명</label>
          <input
            type="text"
            id="itemName"
            name="itemName"
            value={item.itemName}
            onChange={handleChange}
            className={errors.itemName ? 'error' : ''}
            required
          />
          {errors.itemName && <p className="error-message">{errors.itemName}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="itemDetail">상품 상세 설명</label>
          <textarea
            id="itemDetail"
            name="itemDetail"
            value={item.itemDetail}
            onChange={handleChange}
            className={errors.itemDetail ? 'error' : ''}
            required
          />
          {errors.itemDetail && <p className="error-message">{errors.itemDetail}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="price">가격</label>
          <input
            type="number"
            id="price"
            name="price"
            value={item.price}
            onChange={handleChange}
            className={errors.price ? 'error' : ''}
            required
          />
          {errors.price && <p className="error-message">{errors.price}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="stockNumber">재고 수량</label>
          <input
            type="number"
            id="stockNumber"
            name="stockNumber"
            value={item.stockNumber}
            onChange={handleChange}
            className={errors.stockNumber ? 'error' : ''}
            required
          />
          {errors.stockNumber && <p className="error-message">{errors.stockNumber}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="brand">브랜드</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={item.brand}
            onChange={handleChange}
            className={errors.brand ? 'error' : ''}
            required
          />
          {errors.brand && <p className="error-message">{errors.brand}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="categoryId">카테고리 ID</label>
          <input
            type="number"
            id="categoryId"
            name="categoryId"
            value={item.categoryId}
            onChange={handleChange}
            className={errors.categoryId ? 'error' : ''}
            required
          />
          {errors.categoryId && <p className="error-message">{errors.categoryId}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="itemSellStatus">판매 상태</label>
          <select
            id="itemSellStatus"
            name="itemSellStatus"
            value={item.itemSellStatus}
            onChange={handleChange}
            className={errors.itemSellStatus ? 'error' : ''}
            required
          >
            <option value="">선택해주세요</option>
            <option value="SELL">판매 중</option>
            <option value="SOLD_OUT">품절</option>
          </select>
          {errors.itemSellStatus && <p className="error-message">{errors.itemSellStatus}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="gubunSubCode">구분 서브 코드</label>
          <input
            type="text"
            id="gubunSubCode"
            name="gubunSubCode"
            value={item.gubunSubCode}
            onChange={handleChange}
            className={errors.gubunSubCode ? 'error' : ''}
            required
          />
          {errors.gubunSubCode && <p className="error-message">{errors.gubunSubCode}</p>}
        </div>

        {errors.submit && <p className="error-message">{errors.submit}</p>}
        <button type="submit" className="submit-btn">상품 수정</button>
      </form>
    </div>
  );
};

export default ItemUpdateForm;