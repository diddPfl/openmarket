import React, { useState } from 'react';
import axios from 'axios';

const ItemDisable = () => {  // 컴포넌트 이름 수정
    const [itemId, setItemId] = useState('');
    const [message, setMessage] = useState('');

    const handleDisable = async () => {
        if (!itemId) {
            setMessage('Item ID is required');
            return;
        }

        try {
            // PUT 요청을 서버로 보냅니다.
            await axios.put(`/items/${itemId}/disabled`);
            setMessage('Item disabled successfully');
        } catch (error) {
            console.error('Error disabling item:', error);
            setMessage('Failed to disable item');
        }
    };

    return (
        <div>
            <h2>Disable Item</h2>
            <input
                type="number"
                value={itemId}
                onChange={(e) => setItemId(e.target.value)}
                placeholder="Enter item ID"
            />
            <button onClick={handleDisable}>Disable Item</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ItemDisable;
