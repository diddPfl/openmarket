import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginComponent.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    console.log('Submitting login with email:', email, 'and password length:', password.length);

    try {
      const requestBody = { email, password, rememberMe };
      console.log('Request body:', requestBody);

      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        credentials: 'include', // Ensure cookies (like session cookies) are sent with the request
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const userData = await response.json();
        console.log('Login successful:', userData);
        // Save user data to localStorage if needed, or handle it differently
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/'); // Redirect to the home page or wherever needed
      } else {
        const errorData = await response.text();
        console.error('Login failed:', errorData);
        setError(errorData || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
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

        <input type="submit" value="Sign In" />
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
