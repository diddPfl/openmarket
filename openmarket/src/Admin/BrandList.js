import React, { useState, useEffect } from 'react';
import { adminApi } from './api';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminApi.fetchBrands();
      console.log('Fetched brands:', data);
      setBrands(data);
    } catch (error) {
      console.error('Error fetching brands:', error);
      setError('Failed to fetch brands. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (brandName) => {
    try {
      await adminApi.deleteBrand(brandName);
      console.log(`Brand ${brandName} deleted successfully`);
      setBrands(brands.filter(brand => brand !== brandName));
    } catch (error) {
      console.error('Failed to delete brand:', error);
      setError(`Failed to delete brand ${brandName}. Please try again.`);
    }
  };

  if (loading) {
    return <div>Loading brands...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Brands</h2>
      {brands.length === 0 ? (
        <p>No brands found.</p>
      ) : (
        <ul>
          {brands.map(brand => (
            <li key={brand}>
              {brand}
              <button onClick={() => handleDelete(brand)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={fetchBrands}>Refresh Brands</button>
    </div>
  );
};

export default BrandList;