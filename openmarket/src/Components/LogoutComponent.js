import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // useAuth 가져오기

const LogoutComponent = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // useAuth에서 logout 함수 가져오기

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      logout(); // AuthContext를 사용해 로그아웃 처리
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutComponent;
