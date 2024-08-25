import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeliveryListComponent.css';

const DeliveryListComponent = () => {
    const [orders, setOrders] = useState([]);
    const [activeTab, setActiveTab] = useState('section3');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const memberId = sessionStorage.getItem('memberId'); // Assuming you store memberId in sessionStorage
            const response = await axios.get(`/api/orders/member/${memberId}`);
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const activateTab = (sectionId) => {
        setActiveTab(sectionId);
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

    return (
        <div className="container">
            <h1>주문/배송조회</h1>

            <div className="tabs">
                <div className={`tab ${activeTab === 'section3' ? 'active' : ''}`} onClick={() => activateTab('section3')}>3개월</div>
                <div className={`tab ${activeTab === 'section6' ? 'active' : ''}`} onClick={() => activateTab('section6')}>6개월</div>
                <div className={`tab ${activeTab === 'section9' ? 'active' : ''}`} onClick={() => activateTab('section9')}>9개월</div>
                <div className={`tab ${activeTab === 'section12' ? 'active' : ''}`} onClick={() => activateTab('section12')}>12개월</div>
            </div>

            <div id="section3" className={`order-section ${activeTab === 'section3' ? 'active' : ''}`}>
                {orders.map((order) => (
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
                                <div className="value">카드</div> {/* Assuming payment method is always card */}
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
    );
};

export default DeliveryListComponent;