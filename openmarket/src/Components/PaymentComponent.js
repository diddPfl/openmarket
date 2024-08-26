// PaymentComponent.js
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './PaymentComponent.css';

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentData, setPaymentData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const orderId = new URLSearchParams(location.search).get('orderId');
        if (orderId) {
          const response = await axios.get(`/api/payments/${orderId}`);
          setPaymentData(response.data);
        } else {
          setPaymentData(location.state || {});
        }
      } catch (error) {
        console.error('Error fetching payment data:', error);
        setError('결제 정보를 불러오는데 실패했습니다.');
      }
    };

    fetchPaymentData();
  }, [location]);

  const validateOrder = () => {
    if (!paymentData || !paymentData.selectedItems || paymentData.selectedItems.length === 0) {
      setError('결제할 상품이 없습니다.');
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateOrder()) return;

    setIsProcessing(true);
    setError('');

    try {
      const orderData = {
        memberId: sessionStorage.getItem('memberId'),
        orderAmount: paymentData.totalAmount + paymentData.shippingFee,
        orderItems: paymentData.selectedItems.map(item => ({
          itemId: item.itemId,
          count: item.count,
          orderPrice: item.price
        })),
        orderStatus: '결제확인' // Set initial status
      };

      const response = await axios.post('/api/orders', orderData);
      if (response.data && response.data.orderId) {
        alert('주문이 성공적으로 완료되었습니다!');
        navigate('/mypage/deliverylist');
      } else {
        setError('주문 생성에 실패했습니다. 다시 시도해 주세요.');
      }
    } catch (error) {
      console.error('주문 오류:', error);
      setError(error.response?.data?.message || '주문에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!paymentData) {
    return <div className="loading">Loading...</div>;
  }

  const { selectedItems, totalAmount, shippingFee } = paymentData;

  return (
    <div className="container">
      <div className="sidebar">
        <Link to="/mypage" className="text-logo">마이페이지</Link>
        <ul className="nav-list">
          <li className="nav-item"><Link to="/mypage/deliverylist">주문/배송조회</Link></li>
          <li className="nav-item"><Link to="/mypage/cart">장바구니</Link></li>
          <li className="nav-item"><Link to="#">좋아요</Link></li>
          <li className="nav-item"><Link to="/mypage/reviews">리뷰</Link></li>
          <hr className="hr" />
          <li className="nav-item"><Link to="#">정보수정</Link></li>
          <li className="nav-item"><Link to="#">계좌관리</Link></li>
          <li className="nav-item"><Link to="#">배송지관리</Link></li>
        </ul>
      </div>
      <div className="payment-container">
        <div className="payment-card">
          <h2>결제 요약</h2>
          <div className="order-summary">
            {selectedItems && selectedItems.map((item, index) => (
              <div key={index} className="item-row">
                <span className="item-name">{item.itemName}</span>
                <span className="item-quantity">x{item.count}</span>
                <span className="item-price">{(item.price * item.count).toLocaleString()}원</span>
              </div>
            ))}
          </div>
          <div className="total-section">
            <div className="subtotal">
              <span>상품 금액</span>
              <span>{totalAmount?.toLocaleString()}원</span>
            </div>
            <div className="shipping">
              <span>배송비</span>
              <span>{shippingFee?.toLocaleString()}원</span>
            </div>
            <div className="total">
              <span>총 결제 금액</span>
              <span>{(totalAmount + shippingFee)?.toLocaleString()}원</span>
            </div>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="pay-button"
          >
            {isProcessing ? '처리 중...' : '결제하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;