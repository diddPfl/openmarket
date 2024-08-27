import React, { useState } from 'react';
import axios from 'axios';
import './ItemInsert.css';

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
    const files = Array.from(e.target.files);
    setImages(prevImages => [
      ...prevImages,
      ...files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
    ]);
  };

  const handleImageReorder = (dragIndex, hoverIndex) => {
    const draggedImage = images[dragIndex];
    const newImages = [...images];
    newImages.splice(dragIndex, 1);
    newImages.splice(hoverIndex, 0, draggedImage);
    setImages(newImages);
  };

  const handleRemoveImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('jwt');

    try {
       const authToken = token.startsWith('Bearer ') ? token : `Bearer ${token}`;
             console.log('authToken : ' + authToken);


        const response = await axios.post('/api/items', item, {
                  headers: {
                      'Authorization': authToken,
                      'Content-Type': 'application/json'
                  }
              });

              const savedItemId = response.data.itemId;

      if (images.length > 0) {
        const formData = new FormData();
        images.forEach((image, index) => {
          formData.append('files', image.file);
        });

        const imageResponse = await axios.post(`http://localhost:9000/upload`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        const imageData = imageResponse.data.map((img, index) => ({
          uuid: img.uuid,
          fileName: img.fileName,
          itemId: savedItemId,
          repimg: index === 0 ? 1 : 0
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
    <div className="item-insert-container">
      <h1>상품 등록</h1>
      <form onSubmit={handleSubmit} className="item-insert-form">
        <div className="form-group">
          <label htmlFor="itemName">상품명</label>
          <input
            id="itemName"
            type="text"
            name="itemName"
            value={item.itemName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemDetail">상품 상세 설명</label>
          <textarea
            id="itemDetail"
            name="itemDetail"
            value={item.itemDetail}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="categoryId">카테고리 ID</label>
          <input
            id="categoryId"
            type="number"
            name="categoryId"
            value={item.categoryId}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">가격</label>
          <input
            id="price"
            type="number"
            name="price"
            value={item.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gubunSubCode">구분 서브 코드</label>
          <input
            id="gubunSubCode"
            type="text"
            name="gubunSubCode"
            value={item.gubunSubCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockNumber">재고 수량</label>
          <input
            id="stockNumber"
            type="number"
            name="stockNumber"
            value={item.stockNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="itemSellStatus">판매 상태</label>
          <select
            id="itemSellStatus"
            name="itemSellStatus"
            value={item.itemSellStatus}
            onChange={handleChange}
            required
          >
            <option value="SELL">판매중</option>
            <option value="SOLD_OUT">품절</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="brand">브랜드</label>
          <input
            id="brand"
            type="text"
            name="brand"
            value={item.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="images">상품 이미지</label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        {images.length > 0 && (
          <div className="image-preview-container">
            {images.map((image, index) => (
              <div
                key={index}
                className={`image-preview ${index === 0 ? 'main-image' : ''}`}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const draggedIndex = Number(e.dataTransfer.getData('text/plain'));
                  handleImageReorder(draggedIndex, index);
                }}
              >
                <img src={image.preview} alt={`Preview ${index + 1}`} />
                <button type="button" onClick={() => handleRemoveImage(index)}>X</button>
              </div>
            ))}
          </div>
        )}

        <button type="submit" className="submit-btn">아이템 등록</button>
      </form>
    </div>
  );
};

export default ItemInsert;