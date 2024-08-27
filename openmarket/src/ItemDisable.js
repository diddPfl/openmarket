import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ItemDisable.css';

const ItemDisable = () => {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [itemName, setItemName] = useState('');

    useEffect(() => {
        const fetchItemName = async () => {
            try {
                const response = await axios.get(`/items/${itemId}`);
                setItemName(response.data.itemName);
            } catch (error) {
                console.error('상품 정보 조회 오류:', error);
                setMessage('상품 정보를 불러오는데 실패했습니다.');
            }
        };

        fetchItemName();
    }, [itemId]);

    const handleDisable = async () => {
        try {
            await axios.put(`/items/${itemId}/disabled`);
            setMessage('상품이 성공적으로 비활성화되었습니다');
            setTimeout(() => navigate('/admin/items'), 2000); // 2초 후 상품 목록 페이지로 이동
        } catch (error) {
            console.error('상품 비활성화 오류:', error);
            setMessage('상품 비활성화에 실패했습니다');
        }
    };

    return (
        <div className="item-disable-container">
            <h2 className="item-disable-title">상품 비활성화</h2>
            {itemName && <p className="item-name">상품명: {itemName}</p>}
            <p className="item-id">상품 ID: {itemId}</p>
            <div className="item-disable-form">
                <button onClick={handleDisable} className="item-disable-button">상품 비활성화</button>
            </div>
            {message && <p className="item-disable-message">{message}</p>}
        </div>
    );
};

export default ItemDisable;