import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import CategoryItemList from './CategoryItemList';

const SearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const term = searchParams.get('term');

    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/search?term=${encodeURIComponent(term)}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setError('Failed to fetch search results');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [location]);

  if (isLoading) return <div>검색 결과를 불러오는 중...</div>;
  if (error) return <div>오류: {error}</div>;

  return (
    <div>
      <h2>검색 결과: "{new URLSearchParams(location.search).get('term')}"</h2>
      <CategoryItemList items={searchResults} />
    </div>
  );
};

export default SearchResults;