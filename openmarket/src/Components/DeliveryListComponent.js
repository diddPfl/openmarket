// DeliveryListComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './DeliveryListComponent.css';

const DeliveryListComponent = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('section3');
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage] = useState(3);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const memberId = sessionStorage.getItem('memberId');
            const response = await axios.get(`/api/orders/member/${memberId}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const activateTab = (sectionId) => {
        setActiveTab(sectionId);
        setCurrentPage(1);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const formatPrice = (price) => {
        return price ? Number(price).toLocaleString() + '원' : 'N/A';
    };

    const getOrderItemsSummary = (orderItems) => {
        if (!orderItems || orderItems.length === 0) return 'No items';
        const firstItem = orderItems[0];
        const otherItemsCount = orderItems.length - 1;
        return `${firstItem.itemId} 외 ${otherItemsCount}건`;
    };

    // Get current orders
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <div className="main-content">
                <h1>주문/배송조회</h1>

                <div className="tabs">
                    <div className={`tab ${activeTab === 'section3' ? 'active' : ''}`} onClick={() => activateTab('section3')}>3개월</div>
                    <div className={`tab ${activeTab === 'section6' ? 'active' : ''}`} onClick={() => activateTab('section6')}>6개월</div>
                    <div className={`tab ${activeTab === 'section9' ? 'active' : ''}`} onClick={() => activateTab('section9')}>9개월</div>
                    <div className={`tab ${activeTab === 'section12' ? 'active' : ''}`} onClick={() => activateTab('section12')}>12개월</div>
                </div>

                <div id="section3" className={`order-section ${activeTab === 'section3' ? 'active' : ''}`}>
                    {currentOrders.map((order) => (
                        <div key={order.orderId} className="order-box">
                            <div className="order-header">{formatDate(order.orderDate)}</div>
                            <div className="order-info">
                                <div>
                                    <div className="label">주문번호</div>
                                    <div className="value">{order.orderId}</div>
                                </div>
                                <div>
                                    <div className="label">상품명</div>
                                    <div className="value">{getOrderItemsSummary(order.orderItems)}</div>
                                </div>
                                <div>
                                    <div className="label">결제방법</div>
                                    <div className="value">카드</div>
                                </div>
                                <div>
                                    <div className="label">결제금액</div>
                                    <div className="value">{formatPrice(order.orderAmount)}</div>
                                </div>
                                <div>
                                    <div className="label">배송상태</div>
                                    <div className={`value status ${order.orderStatus === '배송완료' ? 'completed' : ''}`}>
                                        {order.orderStatus}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="pagination">
                        {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, i) => (
                            <button key={i} onClick={() => paginate(i + 1)} className={currentPage === i + 1 ? 'active' : ''}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>

                <div id="section6" className={`order-section ${activeTab === 'section6' ? 'active' : ''}`}>
                    {/* Empty section */}
                </div>

                <div id="section9" className={`order-section ${activeTab === 'section9' ? 'active' : ''}`}>
                    {/* Empty section */}
                </div>

                <div id="section12" className={`order-section ${activeTab === 'section12' ? 'active' : ''}`}>
                    {/* Empty section */}
                </div>
            </div>
        </div>
    );
};

export default DeliveryListComponent;