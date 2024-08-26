import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './CategoryItemList.css';
import Pagination from './Pagination';
import Filter from './Filter'; // 필터 컴포넌트 import

const SelectedFilters = ({ selectedBrand, minPrice, maxPrice, onRemove }) => {
  return (
    <div className="selected-filters">
      {selectedBrand && (
        <span className="filter-tag">
          브랜드: {selectedBrand}
          <button onClick={() => onRemove('brand')}>X</button>
        </span>
      )}
      {(minPrice || maxPrice) && (
        <span className="filter-tag">
          가격: {minPrice || '0'}원 - {maxPrice || '무제한'}원
          <button onClick={() => onRemove('price')}>X</button>
        </span>
      )}
    </div>
  );
};

const CategoryItemList = ({ items: propItems }) => {
  const [items, setItems] = useState(propItems || []);
  const [filteredItems, setFilteredItems] = useState(propItems || []);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, gubunSubCode } = useParams();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get('/api/categoryitems/brands');
        setBrands(response.data);
      } catch (error) {
        console.error('브랜드 가져오기 오류:', error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      if (propItems) {
        setItems(propItems);
        setFilteredItems(propItems);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        try {
          let response;
          let url = '';
          if (categoryId) {
            url = `/api/categoryitems/byCategory/${categoryId}`;
          } else if (gubunSubCode) {
            url = `/api/categoryitems/byGubun/${gubunSubCode}`;
          } else {
            throw new Error('카테고리 ID 또는 구분 서브 코드가 필요합니다.');
          }
          response = await axios.get(url);
          console.log('받은 아이템:', response.data);
          if (Array.isArray(response.data)) {
            const sortedItems = response.data.sort((a, b) => b.itemId - a.itemId);
            setItems(sortedItems);
            setFilteredItems(sortedItems);
          } else {
            setItems([]);
            setFilteredItems([]);
            console.error('API 응답이 배열이 아닙니다:', response.data);
          }
        } catch (error) {
          console.error('아이템 가져오기 오류:', error);
          setError('아이템 가져오기 실패');
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchItems();
  }, [categoryId, gubunSubCode, propItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, gubunSubCode]);

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const getImageUrl = (image) => {
    return `http://localhost:9000/view/${image.fileName}`;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleFilter = ({ selectedBrand, minPrice, maxPrice }) => {
    const filtered = items.filter(item => {
      const price = item.price;
      const min = minPrice ? parseFloat(minPrice) : 0;
      const max = maxPrice ? parseFloat(maxPrice) : Infinity;
      return price >= min && price <= max && (selectedBrand ? item.brand === selectedBrand : true);
    });
    const sortedFilteredItems = filtered.sort((a, b) => b.itemId - a.itemId);
    setFilteredItems(sortedFilteredItems);
    setCurrentPage(1);
  };

  const handleRemoveFilter = (filterType) => {
    if (filterType === 'brand') {
      setSelectedBrand('');
    } else if (filterType === 'price') {
      setMinPrice('');
      setMaxPrice('');
    }
    handleFilter({ selectedBrand: '', minPrice: '', maxPrice: '' });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) return <div className="category-item-list-loading">로딩 중...</div>;
  if (error) return <div className="category-item-list-error">{error}</div>;
  if (filteredItems.length === 0) return <div className="category-item-list-no-items">아이템이 없습니다.</div>;

  return (
    <div className="category-container">
      <Filter brands={brands} onFilter={handleFilter} />
      <SelectedFilters
        selectedBrand={selectedBrand}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onRemove={handleRemoveFilter}
      />
      <div className="category-display">
        {currentItems.map((item) => (
          <div key={item.itemId} className="category-item" onClick={() => handleItemClick(item.itemId)}>
            <div className="img-box">
              <img src={getImageUrl(item.images[0])} alt={item.name} />
            </div>
            <div className="brand-and-icons">
              <span className="item-brand">{item.brand}</span>
              <div className="icon-container">
                <span className="icon">♡</span>
                <span className="icon">🛒</span>
              </div>
            </div>
            <h3 className="item-name">{item.itemName}</h3>
            <p className="item-price">{item.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={filteredItems.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
    </div>
  );
};

export default CategoryItemList;