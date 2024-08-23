import React, { useState, useEffect } from 'react';
import { adminApi } from './api';

const BrandList = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    adminApi.fetchBrands().then(setBrands).catch(console.error);
  }, []);

  const handleDelete = async (brandName) => {
    try {
      await adminApi.deleteBrand(brandName);
      setBrands(brands.filter(brand => brand !== brandName));
    } catch (error) {
      console.error('Failed to delete brand:', error);
    }
  };

  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {brands.map(brand => (
          <li key={brand}>
            {brand}
            <button onClick={() => handleDelete(brand)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;