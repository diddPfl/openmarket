import React, { useState } from 'react';
import './Filter.css';

const FilterComponent = ({ brands, onFilter }) => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);

  const priceRanges = [
    { min: 1000, max: 2000, label: '1000원 - 2000원' },
    { min: 2000, max: 3000, label: '2000원 - 3000원' },
    { min: 3000, max: 4000, label: '3000원 - 4000원' },
    { min: 4000, max: 5000, label: '4000원 - 5000원' },
    { min: 0, max: Infinity, label: '모든 가격' },
  ];

  const toggleBrandDropdown = () => {
    setShowBrandDropdown(!showBrandDropdown);
    setShowPriceDropdown(false);
  };

  const togglePriceDropdown = () => {
    setShowPriceDropdown(!showPriceDropdown);
    setShowBrandDropdown(false);
  };

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setShowBrandDropdown(false);
  };

  const handlePriceRangeSelect = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
    setShowPriceDropdown(false);
  };

  const handlePriceInputChange = (e, type) => {
    const value = e.target.value;
    if (type === 'min') {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const handleSearch = () => {
    onFilter({ selectedBrand, minPrice, maxPrice });
  };

  return (
    <div className="filter-component">
      <div className="menu-bar">
        <div className="dropdown">
          <button className="menu-item" onClick={toggleBrandDropdown}>
            브랜드 선택
          </button>
          {showBrandDropdown && (
            <div className="dropdown-content show">
              {brands.map(brand => (
                <div key={brand} className="dropdown-item" onClick={() => handleBrandSelect(brand)}>
                  {brand}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="dropdown">
          <button className="menu-item" onClick={togglePriceDropdown}>
            가격 범위 선택
          </button>
          {showPriceDropdown && (
            <div className="dropdown-content show">
              {priceRanges.map(range => (
                <div key={range.label} className="dropdown-item" onClick={() => handlePriceRangeSelect(range.min, range.max)}>
                  {range.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="price-input">
          <input
            type="number"
            placeholder="최소 가격"
            value={minPrice}
            onChange={(e) => handlePriceInputChange(e, 'min')}
          />
          <input
            type="number"
            placeholder="최대 가격"
            value={maxPrice}
            onChange={(e) => handlePriceInputChange(e, 'max')}
          />
        </div>
        <button className="search-button" onClick={handleSearch}>검색</button>
      </div>
    </div>
  );
};

export default FilterComponent;