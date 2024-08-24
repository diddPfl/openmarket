import React, { useState, useEffect, useCallback } from 'react';
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

  const calculateTotals = useCallback((items) => {
    console.log('Calculating totals for items:', items);
    const total = items.reduce((sum, item) => {
      const itemTotal = item.price * item.count;
      console.log(`Item: ${item.itemName}, Price: ${item.price}, Count: ${item.count}, Total: ${itemTotal}`);
      return sum + itemTotal;
    }, 0);
    console.log('Total amount:', total);
    setTotalAmount(total);
    setDiscountAmount(0);
    setShippingFee(total > 50000 ? 0 : 3000);
  }, []);

  const fetchCartItems = useCallback(async () => {
    try {
      setLoading(true);
      const memberId = sessionStorage.getItem('memberId') || '1';
      const response = await axios.get(`/api/cart/${memberId}`);
      console.log('Cart data:', response.data);
      const items = response.data.cartItems || [];
      setCartItems(items.map(item => ({ ...item, selected: false })));
      calculateTotals(items);
    } catch (error) {
      setError('Error fetching cart items');
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateTotals]);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    setLoading(true);
    try {
      const response = await axios.post(`/api/cart/item/${cartItemId}/count`, { count: newQuantity });
      const updatedItem = response.data.item;
      const updatedItems = cartItems.map(item =>
        item.cartItemId === cartItemId ? { ...item, count: updatedItem.count } : item
      );
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (error) {
      console.error('Error updating quantity:', error);
      alert('Failed to update quantity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axios.post(`/api/cart/remove/${cartItemId}`);
      const updatedItems = cartItems.filter(item => item.cartItemId !== cartItemId);
      setCartItems(updatedItems);
      calculateTotals(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleOrder = () => {
    const selectedItems = cartItems.filter(item => item.selected);
    console.log('Selected items:', selectedItems);
    if (selectedItems.length === 0) {
      alert('Please select items to order.');
      return;
    }

    const totalAmount = selectedItems.reduce((total, item) => total + (item.price * item.count), 0);

    console.log('Navigating to payment with state:', {
      selectedItems,
      totalAmount,
      shippingFee
    });

    navigate('/mypage/cart/payment', {
      state: {
        selectedItems,
        totalAmount,
        shippingFee
      }
    });
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    setCartItems(cartItems.map(item => ({ ...item, selected: isChecked })));
  };

  const handleSelectItem = (cartItemId) => {
    setCartItems(cartItems.map(item =>
      item.cartItemId === cartItemId ? { ...item, selected: !item.selected } : item
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
                <th>총 가격</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <CartItem
                    key={item.cartItemId}
                    item={item}
                    onQuantityChange={handleQuantityChange}
                    onRemove={handleRemoveItem}
                    onSelectItem={handleSelectItem}
                    showBrandRow={index > 0 && item.brand !== cartItems[index - 1].brand}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="6">장바구니가 비어 있습니다.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="summary">
            <p>상품금액: <span>{totalAmount.toLocaleString()}원</span></p>
            <p>할인금액: <span>-{discountAmount.toLocaleString()}원</span></p>
            <p>배송비: <span>{shippingFee.toLocaleString()}원</span></p>
            <p><strong>총결제금액: <span>{(totalAmount - discountAmount + shippingFee).toLocaleString()}원</span></strong></p>
          </div>
        </div>

        <div className="delivery-info">
          <h3>배송지 정보</h3>
          <p>주소</p>
          <button>배송지 변경</button>
          <div className="order-summary">
            <div><span>상품금액:</span> {totalAmount.toLocaleString()}원</div>
            <div><span>할인금액:</span> -{discountAmount.toLocaleString()}원</div>
            <div><span>배송비:</span> {shippingFee.toLocaleString()}원</div>
            <div><span>총결제금액:</span> {(totalAmount - discountAmount + shippingFee).toLocaleString()}원</div>
          </div>
          <button className="order-btn" onClick={handleOrder}>주문하기</button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;