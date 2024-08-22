import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './PaymentComponent.css';

const PaymentComponent = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('카드결제');
  const navigate = useNavigate();
  const { orderId } = useParams();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/api/orders/${orderId}`);
        setOrderDetails(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePayment = async () => {
    try {
      const paymentData = {
        orderId: orderDetails.orderId,
        payType: paymentMethod,
      };

      const response = await axios.post('/api/payments', paymentData);

      if (response.status === 200) {
        alert('Payment successful!');
        navigate('/mypage');
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Payment failed. Please try again.');
    }
  };

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="payment-container">
      <h2>Payment</h2>
      <div className="order-summary">
        <h3>Order Summary</h3>
        <p>Total Amount: {orderDetails.totalAmount}원</p>
        <p>Items: {orderDetails.items.join(', ')}</p>
      </div>
      <div className="payment-method">
        <h3>Payment Method</h3>
        <select value={paymentMethod} onChange={handlePaymentMethodChange}>
          <option value="카드결제">Card Payment</option>
          <option value="계좌결제">Bank Transfer</option>
        </select>
      </div>
      <button className="pay-button" onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentComponent;
