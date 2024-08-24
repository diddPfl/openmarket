import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove, onSelectItem, showBrandRow }) => {
  const handleIncrease = () => {
    onQuantityChange(item.cartItemId, item.count + 1);
  };

  const handleDecrease = () => {
    if (item.count > 1) {
      onQuantityChange(item.cartItemId, item.count - 1);
    }
  };

  return (
    <>
      {showBrandRow && (
        <tr className="brand-row">
          <td colSpan="6">{item.brand}</td>
        </tr>
      )}
      <tr>
        <td>
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => onSelectItem(item.cartItemId)}
          />
        </td>
        <td>
          <div className="item-image"></div>
          <span className="item-name">{item.itemName}</span>
        </td>
        <td className="item-controls">
          <button onClick={handleDecrease} disabled={item.count <= 1}>-</button>
          <span className="item-count">{item.count}</span>
          <button onClick={handleIncrease}>+</button>
        </td>
        <td>{item.price.toLocaleString()}원</td>
        <td>{(item.price * item.count).toLocaleString()}원</td>
        <td><span className="delete-btn" onClick={() => onRemove(item.cartItemId)}>✕</span></td>
      </tr>
    </>
  );
};

export default CartItem;