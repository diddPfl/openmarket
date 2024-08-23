import React, { useState, useEffect } from 'react';
import { adminApi } from './api';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    adminApi.fetchItems().then(setItems).catch(console.error);
  }, []);

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item.itemId}>{item.itemName}</li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;