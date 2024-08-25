import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentComponent.css';

const PaymentComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems, totalAmount, shippingFee } = location.state || {};
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const validateOrder = () => {
    if (!selectedItems || selectedItems.length === 0) {
      setError('No items selected for payment.');
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
        navigate('/mypage/deliverylist');
      } else {
        setError('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!selectedItems || selectedItems.length === 0) {
    return <div className="error-message">No items selected for payment.</div>;
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
      {error && <div className="error-message">{error}</div>}
      <button
        onClick={handlePayment}
        disabled={isProcessing}
        className={isProcessing ? 'processing' : ''}
      >
        {isProcessing ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
};

export default PaymentComponent;