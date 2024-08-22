import React from 'react';

const DeliveryInfo = ({ totalAmount, discountAmount, shippingFee, onOrder }) => {
  return (
    <div className="delivery-info">
      <h3>배송지 정보</h3>
      <p>주소</p>
      <button>배송지 변경</button>
      <div className="order-summary">
        <div><span>상품금액:</span> {totalAmount}원</div>
        <div><span>할인금액:</span> -{discountAmount}원</div>
        <div><span>배송비:</span> {shippingFee}원</div>
        <div><span>총결제금액:</span> {totalAmount - discountAmount + shippingFee}원</div>
      </div>
      <a href="#" className="order-btn" onClick={onOrder}>주문하기</a>
    </div>
  );
};

export default DeliveryInfo;