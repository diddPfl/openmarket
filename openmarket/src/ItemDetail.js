import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";
import "./ItemDetail.css";

function ItemDetail() {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const imgBoxRef = useRef(null);

  useEffect(() => {
    fetchItemById(id);
  }, [id]);

  const fetchItemById = async (itemId) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:9000/items/${itemId}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item details:', error);
      setError('Failed to fetch item details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const slide = (direction) => {
    if (!item || !item.images || item.images.length <= 1) return;

    let newIndex = currentIndex + direction;
    if (newIndex < 0) {
      newIndex = item.images.length - 1;
    } else if (newIndex >= item.images.length) {
      newIndex = 0;
    }

    setCurrentIndex(newIndex);
    if (imgBoxRef.current) {
      imgBoxRef.current.style.transform = `translateX(-${newIndex * 100}%)`;
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div>
    <Header/>
      <div className="item-container">
        <div className="slider-container">
          {item.images && item.images.length > 1 && (
            <i className="fa-solid fa-angle-left" onClick={() => slide(-1)}></i>
          )}
          <div className="img-box" ref={imgBoxRef}>
            {item.images && item.images.map((image, index) => (
              <img key={index} src={`/view/${image.fileName}`} alt={`Item Image ${index + 1}`} />
            ))}
          </div>
          {item.images && item.images.length > 1 && (
            <i className="fa-solid fa-angle-right" onClick={() => slide(1)}></i>
          )}
        </div>
        <div className="item-info">
          <div className="item-name">
            <h1>{item.itemName}</h1>
          </div>
          <div className="item-detail">
            <p>{item.itemDetail}</p>
          </div>
          <div className="item-detail-info">
            <dl className="sell-status">
              <dt>판매상태</dt>
              <dd>#</dd>
            </dl>
            <dl className="model-number">
              <dt>모델번호</dt>
              <dd>#</dd>
            </dl>
            <dl className="item-id">
              <dt>상품 번호</dt>
              <dd>{item.itemId}</dd>
            </dl>
            <dl className="reg-date">
              <dt>상품 등록일</dt>
              <dd>{item.regdate}</dd>
            </dl>
          </div>
          <div className="item-price">
            <h1>{item.price}원</h1>
          </div>
          <div className="button-box">
            <div className="purchase-btn">
              <button>구매</button>
            </div>
            <div className="sell-btn">
              <button>판매</button>
            </div>
          </div>
          <div className="call-dibs">
            <button>위시리스트</button>
          </div>
          <div className="item-category">
            <p>{item.categoryName}</p>
          </div>
        </div>
      </div>
      <div className="item-descript">
        <div className="item-menu">
          <a href="#">상품 상세</a>
          <a href="#">상품 설명</a>
          <a href="#">상품 후기</a>
          <a href="#">상품 Q&A</a>
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;