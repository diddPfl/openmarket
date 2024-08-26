import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ItemUpdateForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState({
    itemName: '',
    itemDetail: '',
    price: '',
    stockNumber: '',
    brand: '',
    categoryId: '',
    itemSellStatus: 'SELL',
    gubunSubCode: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the existing item data
    const fetchItem = async () => {
      try {
        const response = await fetch(`/items/${id}/edit`);
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error('Error fetching item:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/items/${id}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      navigate(`/item/${id}`); // Redirect to the item detail page after update
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-xl mb-4">Update Item</h2>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="itemName">Item Name</label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={item.itemName}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="itemDetail">Item Detail</label>
        <textarea
          id="itemDetail"
          name="itemDetail"
          value={item.itemDetail}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          value={item.price}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="stockNumber">Stock Number</label>
        <input
          type="number"
          id="stockNumber"
          name="stockNumber"
          value={item.stockNumber}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="brand">Brand</label>
        <input
          type="text"
          id="brand"
          name="brand"
          value={item.brand}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="categoryId">Category ID</label>
        <input
          type="text"
          id="categoryId"
          name="categoryId"
          value={item.categoryId}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="gubunSubCode">Gubun Sub Code</label>
        <input
          type="text"
          id="gubunSubCode"
          name="gubunSubCode"
          value={item.gubunSubCode || ''}  // Default to an empty string if not provided
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2" htmlFor="itemSellStatus">Item Sell Status</label>
        <select
          id="itemSellStatus"
          name="itemSellStatus"
          value={item.itemSellStatus}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        >
          <option value="SELL">Sell</option>
          <option value="SOLD_OUT">Sold Out</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2">Update Item</button>
    </form>
  );
};

export default ItemUpdateForm;
