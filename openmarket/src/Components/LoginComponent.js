import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // AuthContext에서 useAuth 가져오기
import styles from './LoginComponent.module.css';

const LoginComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // useAuth를 통해 login 함수 사용, login 함수는 JWT 토큰을 저장하고 인증 상태를 업데이트하는 역할

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
        credentials: 'include',
      });

      console.log('Response status:', response.status);

      if (response.ok) {
        const jwtToken = response.headers.get('Authorization');
        const userData = await response.json(); // body에 저장한 사용자 데이터를 받아옴
        console.log('userData : ', userData);

        if (jwtToken) {
          login(jwtToken, userData.name);    // login 함수를 통해 JWT 토큰 저장 및 사용자명 전달
          navigate('/'); // 로그인 성공 시 리다이렉트
        }
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

      <div className={styles.options}>
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
