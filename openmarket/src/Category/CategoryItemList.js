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
        if (propItems) {
          setItems(propItems);
          setFilteredItems(propItems);
          setIsLoading(false);
        } else {
          const fetchItems = async () => {
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
              setItems(response.data);
              setFilteredItems(response.data);
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
        };

        fetchItems();
      }
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
    setFilteredItems(filtered);
    setCurrentPage(1); // 검색 결과 적용 시 첫 페이지로 이동
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

  const isFilterSelected = selectedBrand || minPrice || maxPrice;

  // 페이징 관련 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <div className="category-item-list-loading">로딩 중...</div>;
  if (error) return <div className="category-item-list-error">오류: {error}</div>;

   return (
     <div className="category-item-list-page-container">
      <div className="category-item-list-filters">
        <button onClick={toggleBrandDropdown} className="category-item-list-brand-button">
          브랜드 선택
        </button>
        {showBrandDropdown && (
          <div className="category-item-list-brand-dropdown">
            {brands.map((brand) => (
              <div key={brand} onClick={() => handleBrandSelect(brand)} className="category-item-list-brand-option">
                {brand}
              </div>
            ))}
          </div>
        )}
        <button onClick={togglePriceDropdown} className="category-item-list-brand-button">
          가격 선택
        </button>
        {showPriceDropdown && (
          <div className="category-item-list-price-dropdown">
            {priceRanges.map((range) => (
              <div
                key={range.label}
                onClick={() => handlePriceRangeSelect(range.min, range.max)}
                className="category-item-list-price-option"
              >
                {range.label}
              </div>
            ))}
            <div className="category-item-list-price-inputs">
              <input
                type="number"
                placeholder="최소 가격"
                value={minPrice}
                onChange={(e) => handlePriceInputChange(e, 'min')}
                className="category-item-list-price-input"
              />
              <input
                type="number"
                placeholder="최대 가격"
                value={maxPrice}
                onChange={(e) => handlePriceInputChange(e, 'max')}
                className="category-item-list-price-input"
              />
            </div>
          </div>
        )}
        {isFilterSelected && (
          <button onClick={searchFilteredItems} className="category-item-list-search-button">검색</button>
        )}
      </div>
      <div className="category-item-list-selected-filters">
        {selectedBrand && <p>{selectedBrand}</p>}
        {(minPrice || maxPrice) && <p>{minPrice}원 - {maxPrice === Infinity ? '무제한' : `${maxPrice}원`}</p>}
      </div>
      <div className="category-item-list-items">
        {currentItems.length === 0 ? (
          <div className="category-item-list-no-items">해당 카테고리의 상품이 없습니다.</div>
        ) : (
          currentItems.map((item) => (
            <div
              key={item.itemId}
              className="category-item-list-item"
              onClick={() => handleItemClick(item.itemId)}
              role="button"
              tabIndex={0}
            >
              <div className="img-box">
                {item.images && item.images.map((image) => (
                  <img
                    key={image.uuid}
                    src={getImageUrl(image)}
                    alt={`아이템 이미지 - ${item.itemName}`}
                  />
                ))}
              </div>
              <div className="brand-and-icons">
                {item.brand && <p className="category-item-list-item-brand">{item.brand}</p>}
                <div className="icon-container">
                  <i className="fas fa-heart icon" title="좋아요"></i>
                  <i className="fas fa-shopping-cart icon" title="장바구니"></i>
                </div>
              </div>
              <h3 className="category-item-list-item-name">{item.itemName}</h3>
              <p className="category-item-list-item-price">{item.price.toLocaleString()}원</p>
            </div>
          ))
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default CategoryItemList;