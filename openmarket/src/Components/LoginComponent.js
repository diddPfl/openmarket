import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginComponent.module.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log('Submitting login with email:', email, 'and password length:', password.length);

    try {
      const requestBody = { email, password };
      console.log('Request body:', requestBody);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const jwtToken = response.headers.get('Authorization');
        const userData = await response.json();

        console.log('userData:', userData);

        if (jwtToken) {
          login(jwtToken, userData.name, userData.roles);
          navigate('/');
        }
      } else {
        const errorData = await response.text();
        console.error('Login failed:', errorData);
        setError(errorData || 'Invalid email or password');
        setOpen(true);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
      setOpen(true);
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

        <input
          type="submit"
          value={isLoading ? "Signing In..." : "Sign In"}
          disabled={isLoading}
        />
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