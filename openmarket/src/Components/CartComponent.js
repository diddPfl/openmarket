// CartComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import CartItem from './CartItem';
import './CartComponent.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingFee] = useState(3000);
    const [discount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const memberId = sessionStorage.setItem('memberId', response.data.memberId);
            if (!memberId) {
                navigate('/login');
                return;
            }
            const response = await axios.get(`http://localhost:9000/api/cart/${memberId}`);
            setCartItems(response.data.cartItems);
            calculateTotal(response.data.cartItems);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    const calculateTotal = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.count, 0);
        setTotalPrice(total);
    };

    const updateItemCount = async (cartItemId, newCount) => {
        if (newCount < 0) return; // Prevent negative counts
        try {
            await axios.post(`http://localhost:9000/api/cart/item/${cartItemId}/count`, { count: newCount });
            const updatedItems = cartItems.map(item =>
                item.cartItemId === cartItemId ? { ...item, count: newCount } : item
            );
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
        } catch (error) {
            console.error('Error updating item count:', error);
        }
    };

    const removeItem = async (cartItemId) => {
        try {
            await axios.post(`http://localhost:9000/api/cart/remove/${cartItemId}`);
            const updatedItems = cartItems.filter(item => item.cartItemId !== cartItemId);
            setCartItems(updatedItems);
            calculateTotal(updatedItems);
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const handleOrder = () => {
        const orderData = {
            selectedItems: cartItems,
            totalAmount: totalPrice,
            shippingFee: shippingFee
        };
        navigate('/mypage/cart/payment', { state: orderData });
    };

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
            <div className="cart-wrapper">
                <div className="cart-container">
                    <h2>장바구니</h2>
                    {cartItems.length === 0 ? (
                        <p className="centered">장바구니가 비어 있습니다.</p>
                    ) : (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        <th>상품정보</th>
                                        <th>수량</th>
                                        <th>가격</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <React.Fragment key={item.cartItemId}>
                                            <tr className="brand-row">
                                                <td colSpan="4">{item.brand}</td>
                                            </tr>
                                            <tr>
                                                <td className="item-name">
                                                    <div className="item-image"></div>
                                                    {item.itemName}
                                                </td>
                                                <td>
                                                    <div className="item-controls">
                                                        <button onClick={() => updateItemCount(item.cartItemId, item.count - 1)}>-</button>
                                                        <span className="item-count">{item.count}</span>
                                                        <button onClick={() => updateItemCount(item.cartItemId, item.count + 1)}>+</button>
                                                    </div>
                                                </td>
                                                <td>{item.price.toLocaleString()}원</td>
                                                <td>
                                                    <span className="delete-btn" onClick={() => removeItem(item.cartItemId)}>×</span>
                                                </td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                            <div className="summary">
                                <p>상품금액: <span>{totalPrice.toLocaleString()}원</span></p>
                                <p>할인금액: <span>-{discount.toLocaleString()}원</span></p>
                                <p>배송비: <span>{shippingFee.toLocaleString()}원</span></p>
                                <p>총결제금액: <span>{(totalPrice + shippingFee - discount).toLocaleString()}원</span></p>
                            </div>
                        </>
                    )}
                </div>
                <div className="delivery-info">
                    <div>
                        <h3>배송지</h3>
                        <p>서울특별시 강남구 테헤란로 123</p>
                        <button>배송지 변경</button>
                    </div>
                    <div className="order-summary">
                        <div>
                            <span>상품금액</span>
                            <span>{totalPrice.toLocaleString()}원</span>
                        </div>
                        <div>
                            <span>할인금액</span>
                            <span>-{discount.toLocaleString()}원</span>
                        </div>
                        <div>
                            <span>배송비</span>
                            <span>{shippingFee.toLocaleString()}원</span>
                        </div>
                        <div>
                            <span>총결제금액</span>
                            <span>{(totalPrice + shippingFee - discount).toLocaleString()}원</span>
                        </div>
                    </div>
                    <button className="order-btn" onClick={handleOrder}>주문하기</button>
                </div>
            </div>
        </div>
    );
}

export default Cart;