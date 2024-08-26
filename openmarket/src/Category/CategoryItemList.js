import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './CategoryItemList.css';
import Pagination from './Pagination';

const CategoryItemList = ({ items: propItems }) => {
  const [items, setItems] = useState(propItems || []);
  const [filteredItems, setFilteredItems] = useState(propItems || []);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showBrandDropdown, setShowBrandDropdown] = useState(false);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const navigate = useNavigate();
  const location = useLocation();
  const { categoryId, gubunSubCode } = useParams();

  const priceRanges = [
    { min: 1000, max: 2000, label: '1000원 - 2000원' },
    { min: 2000, max: 3000, label: '2000원 - 3000원' },
    { min: 3000, max: 4000, label: '3000원 - 4000원' },
    { min: 4000, max: 5000, label: '4000원 - 5000원' },
    { min: 0, max: Infinity, label: '모든 가격' },
  ];

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
    setSelectedBrand('');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
  }, [categoryId, gubunSubCode]);

  useEffect(() => {
    setShowBrandDropdown(false);
    setShowPriceDropdown(false);
  }, [location]);

  const searchFilteredItems = () => {
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

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  const getImageUrl = (image) => {
    return `http://localhost:9000/view/${image.fileName}`;
  };

  const toggleBrandDropdown = () => {
    setShowBrandDropdown(!showBrandDropdown);
  };

  const togglePriceDropdown = () => {
    setShowPriceDropdown(!showPriceDropdown);
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const isFilterSelected = selectedBrand || minPrice || maxPrice;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="category-item-list-container category-container">
      <div className="menu-bar">
        <div className="brand-dropdown">
          <button onClick={toggleBrandDropdown} className="menu-item">
            브랜드 선택
          </button>
          {showBrandDropdown && (
            <ul className="dropdown-menu">
              <li onClick={() => handleBrandSelect('')}>모든 브랜드</li>
              {brands.map((brand) => (
                <li key={brand} onClick={() => handleBrandSelect(brand)}>
                  {brand}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="price-dropdown">
          <button onClick={togglePriceDropdown} className="menu-item">
            가격 범위 선택
          </button>
          {showPriceDropdown && (
            <ul className="dropdown-menu">
              {priceRanges.map((range, index) => (
                <li
                  key={index}
                  onClick={() => handlePriceRangeSelect(range.min, range.max)}
                >
                  {range.label}
                </li>
              ))}
            </ul>
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
        <button onClick={searchFilteredItems} className="menu-item">
          검색
        </button>
      </div>
      {isFilterSelected && (
        <div className="filter-info">
          <span>선택된 필터:</span>
          {selectedBrand && <span>브랜드: {selectedBrand}</span>}
          {minPrice && <span>최소 가격: {minPrice}원</span>}
          {maxPrice && <span>최대 가격: {maxPrice}원</span>}
        </div>
      )}
      <div className="category-display">
        {currentItems.map((item) => (
          <div
            key={item.itemId}
            className="category-item"
            onClick={() => handleItemClick(item.itemId)}
          >
            <div className="img-box">
              {item.images && item.images.length > 0 && (
                <img src={getImageUrl(item.images[0])} alt={item.itemName} />
              )}
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