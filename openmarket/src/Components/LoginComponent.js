import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './LoginComponent.module.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log('Submitting login with email:', email);

    try {
      const response = await axios.post('/api/login', { email, password, rememberMe }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('Login response:', response);

      if (response.status >= 200 && response.status < 300 && response.data) {
        const jwtToken = response.headers.get('Authorization');
        const { memberId, name } = response.data;

        if (jwtToken) {
          login(jwtToken, name, memberId);
          axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
          navigate('/');
        } else {
          setError('No token received from server');
        }
      } else {
        setError('Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      setError(error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />

        <div className="remember-me">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember">Remember me</label>
        </div>

        <input type="submit" value={isLoading ? "Signing In..." : "Sign In"} disabled={isLoading} />
      </form>

      <div className="options">
        <Link to="/signup">Sign Up</Link>
        <span>|</span>
        <Link to="/find-id">Find ID</Link>
        <span>|</span>
        <Link to="/find-password">Find Password</Link>
      </div>
    </div>
  );
};

export default LoginComponent;