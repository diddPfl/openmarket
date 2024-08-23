import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DeliveryListComponent.css';

const DeliveryListComponent = () => {
    const [activeTab, setActiveTab] = useState('section3');
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchOrders(3);
    }, []);

    const fetchOrders = async (months) => {
        setIsLoading(true);
        setError(null);
        try {
            console.log(`Fetching orders for ${months} months`);
            const response = await axios.get(`http://localhost:9000/api/mypage/deliverylist/${months}`);
            console.log('API Response:', response.data);

            if (Array.isArray(response.data)) {
                setOrders(response.data);
                console.log(`${response.data.length} orders retrieved`);
            } else {
                console.warn('Response is not an array:', response.data);
                setOrders([]);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            }
            setError('Failed to fetch orders. Please try again later.');
            setOrders([]);
        } finally {
            setIsLoading(false);
        }
    };

    const activateTab = (sectionId) => {
        setActiveTab(sectionId);
        const months = parseInt(sectionId.replace('section', ''));
        fetchOrders(months);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price) + '원';
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container">
            <h1>주문/배송조회</h1>

            <div className="tabs">
                {[3, 6, 9, 12].map((month) => (
                    <div
                        key={`section${month}`}
                        className={`tab ${activeTab === `section${month}` ? 'active' : ''}`}
                        onClick={() => activateTab(`section${month}`)}
                    >
                        {month}개월
                    </div>
                ))}
            </div>

            <div className={`order-section ${activeTab}`}>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.orderId} className="order-box">
                            <div className="order-header">{formatDate(order.orderDate)}</div>
                            <div className="order-info">
                                <div>
                                    <div className="label">주문번호</div>
                                    <div className="value">{order.orderId}</div>
                                </div>
                                <div>
                                    <div className="label">상품명</div>
                                    <div className="value">{order.itemName}</div>
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
                    ))
                ) : (
                    <p>주문 내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
};

export default DeliveryListComponent;