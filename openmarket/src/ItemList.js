import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('http://localhost:9000/items/list');
      console.log('API response:', response.data);
      if (Array.isArray(response.data)) {
        setItems(response.data);
      } else {
        throw new Error('Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Failed to fetch items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Item List</h2>
      {items.length > 0 ? (
        <ul>
          {items.map(item => (
            <li key={item.itemId}>
              <Link to={`/item/${item.itemId}`}>
                {item.itemName}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
}

export default ItemList;