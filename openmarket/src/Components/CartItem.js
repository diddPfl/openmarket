import React from 'react';

const CartItem = ({ item, onQuantityChange, onRemove, onSelectItem, showBrandRow }) => {
  return (
    <>
      {showBrandRow && (
        <tr className="brand-row">
          <td colSpan="5">{item.brand}</td>
        </tr>
      )}
      <tr>
        <td>
          <input
            type="checkbox"
            checked={item.selected}
            onChange={() => onSelectItem(item.id)}
          />
        </td>
        <td>
          <div className="item-image"></div>
          <span className="item-name">{item.name}</span>
        </td>
        <td className="item-controls">
          <button onClick={() => onQuantityChange(item.id, Math.max(1, item.quantity - 1))}>-</button>
          <span className="item-count">{item.quantity}</span>
          <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>+</button>
        </td>
        <td>{item.price}원</td>
        <td><span className="delete-btn" onClick={() => onRemove(item.id)}>✕</span></td>
      </tr>
    </>
  );
};

export default CartItem;
