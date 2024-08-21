import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogoutComponent = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout');
      localStorage.removeItem('user');
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