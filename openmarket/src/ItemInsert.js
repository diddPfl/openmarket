import React, { useState } from 'react';
import axios from 'axios';

const ItemInsert = () => {
  const [item, setItem] = useState({
    itemName: '',
    itemDetail: '',
    categoryId: '',
    price: '',
    gubunSubCode: '',
    stockNumber: '',
    itemSellStatus: 'SELL',
    brand: ''
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem(prevItem => ({
      ...prevItem,
      [name]: ['categoryId', 'price', 'stockNumber'].includes(name) ? Number(value) : value
    }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/items', item);
      const savedItemId = response.data.itemId;

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image) => {
          formData.append('files', image);
        });

        const imageResponse = await axios.post(`http://localhost:9000/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        const imageData = imageResponse.data.map(img => ({
          uuid: img.uuid,
          fileName: img.fileName,
          itemId: savedItemId
        }));

        await axios.post(`http://localhost:9000/items/${savedItemId}/images`, imageData);
      }

      alert('아이템이 성공적으로 등록되었습니다.');
      setItem({
        itemName: '',
        itemDetail: '',
        categoryId: '',
        price: '',
        gubunSubCode: '',
        stockNumber: '',
        itemSellStatus: 'SELL',
        brand: ''
      });
      setImages([]);
    } catch (error) {
      console.error('Error registering item:', error);
      alert(`아이템 등록 중 오류가 발생했습니다: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="itemName"
        value={item.itemName}
        onChange={handleChange}
        placeholder="상품명"
        required
      />
      <textarea
        name="itemDetail"
        value={item.itemDetail}
        onChange={handleChange}
        placeholder="상품 상세 설명"
        required
      />
      <input
        type="number"
        name="categoryId"
        value={item.categoryId}
        onChange={handleChange}
        placeholder="카테고리 ID"
        required
      />
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={handleChange}
        placeholder="가격"
        required
      />
      <input
        type="text"
        name="gubunSubCode"
        value={item.gubunSubCode}
        onChange={handleChange}
        placeholder="구분 서브 코드"
        required
      />
      <input
        type="number"
        name="stockNumber"
        value={item.stockNumber}
        onChange={handleChange}
        placeholder="재고 수량"
        required
      />
      <select
        name="itemSellStatus"
        value={item.itemSellStatus}
        onChange={handleChange}
        required
      >
        <option value="SELL">판매중</option>
        <option value="SOLD_OUT">품절</option>
      </select>
      <input
        type="text"
        name="brand"
        value={item.brand}
        onChange={handleChange}
        placeholder="브랜드"
        required
      />
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        accept="image/*"
      />
      <button type="submit">아이템 등록</button>
    </form>
  );
};

export default ItemInsert;