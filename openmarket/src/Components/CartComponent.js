import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import './CartComponent.css';

const CartComponent = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [selectAll, setSelectAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/cart/1'); // Assuming member ID is 1
      const items = response.data.cartItems || [];
      setCartItems(items.map(item => ({ ...item, selected: false })));
      calculateTotals(items);
    } catch (error) {
      setError('Error fetching cart items');
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotals = (items) => {
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
    setDiscountAmount(0); // Implement discount logic if needed
    setShippingFee(total > 50000 ? 0 : 3000);
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      await axios.post('/api/cart/update', { cartItemId: itemId, count: newQuantity });
      const updatedItems = cartItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.post(`/api/cart/remove/${itemId}`);
      const updatedItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleOrder = async () => {
    try {
      const response = await axios.post('/api/order', { cartItems, totalAmount, discountAmount, shippingFee });
      if (response.data.orderId) {
        navigate(`/mypage/cart/payment/${response.data.orderId}`);
      } else {
        alert('Failed to create order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setCartItems(cartItems.map(item => ({ ...item, selected: isChecked })));
  };

  const handleSelectItem = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId ? { ...item, selected: !item.selected } : item
    ));
    setSelectAll(cartItems.every(item => item.selected));
  };

  if (loading) return <div className="centered">Loading...</div>;
  if (error) return <div className="centered">Error: {error}</div>;

  return (
    <div className="container">
      <div className="cart-wrapper">
        <div className="cart-container">
          <h2>장바구니</h2>
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    id="select-all"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                  전체선택
                </th>
                <th>상품 이름</th>
                <th>수량</th>
                <th>가격</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    onSelectItem={handleSelectItem}
                    showBrandRow={index > 0 && item.brand !== cartItems[index - 1].brand}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="5">장바구니가 비어 있습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="summary">
            <p>상품금액: <span>{totalAmount}원</span></p>
            <p>할인금액: <span>-{discountAmount}원</span></p>
            <p>배송비: <span>{shippingFee}원</span></p>
            <p><strong>총결제금액: <span>{totalAmount - discountAmount + shippingFee}원</span></strong></p>
          </div>
        </div>

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
          <button className="order-btn" onClick={handleOrder}>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
