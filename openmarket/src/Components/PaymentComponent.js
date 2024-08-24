import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems, totalAmount, shippingFee } = location.state || {};

  const handlePayment = async () => {
    try {
      const orderData = {
        memberId: sessionStorage.getItem('memberId'),
        orderAmount: totalAmount + shippingFee,
        orderItems: selectedItems.map(item => ({
          itemId: item.itemId,
          count: item.count,
          orderPrice: item.price
        }))
      };

      const response = await axios.post('/api/orders', orderData);
      if (response.data && response.data.orderId) {
        alert('Order placed successfully!');
        // Navigate to the delivery list page after successful payment
        navigate('/mypage/deliverylist');
      } else {
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (!selectedItems || selectedItems.length === 0) {
    return <div>No items selected for payment.</div>;
  }

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <ul>
          {selectedItems.map((item, index) => (
            <li key={index}>
              {item.itemName} - Quantity: {item.count} - Price: {item.price.toLocaleString()}원
              - Total: {(item.price * item.count).toLocaleString()}원
            </li>
          ))}
        </ul>
        <p>Subtotal: {totalAmount.toLocaleString()}원</p>
        <p>Shipping Fee: {shippingFee.toLocaleString()}원</p>
        <p><strong>Total Amount: {(totalAmount + shippingFee).toLocaleString()}원</strong></p>
      </div>
      <button onClick={handlePayment}>Place Order</button>
    </div>
  );
};

export default PaymentComponent;