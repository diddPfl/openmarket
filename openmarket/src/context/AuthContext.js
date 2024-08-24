// 리액트에서 컨텍스트 Api를 사용하여 전역 상태를 관리하려면 createContext() 함수를 import하여
// 컨텍스트 객체를 생성해야 합니다.
import React, { createContext, useState, useContext, useEffect } from 'react';

// createContext()를 사용하여 AuthContext 생성
// 이렇게 생성된 AuthContext는 Provider와 Consumer를 제공
// provider는 전역 상태를 제공하고, consumer는 전역 상태를 사용하는 컴포넌트
// createContext() 함수의 인자로는 초기 상태를 전달할 수 있음.
// AuthContext는 애플리케이션의 전역 상태로 사용될 수 있습니다.
// 이 Context는 사용자 인증 상태를 다른 컴포넌트에서 사용할 수 있도록 공유합니다.
const AuthContext = createContext();

// AuthProvider 컴포넌트 생성 (애플리케이션의 전역 상태 관리용)
// AuthProvider는 함수형 컴포넌트로, 인증과 관련된 상태(isAuthenticated, name)를 관리하고,
// 이 상태와 관련된 함수를 컨텍스트(AuthContext)를 통해 자식 컴포넌트에게 제공합니다.
// 이 컴포넌트는 AuthContext.Provider를 사용하여 모든 자식 컴포넌트가 AuthContext에 접근할 수 있도록 합니다.
// AuthProvider는 함수형 컴포넌트로, 인증과 관련된 상태(isAuthenticated, name)를 관리하고,
// 이 상태와 관련된 함수를 컨텍스트(AuthContext)를 통해 자식 컴포넌트에게 제공합니다.
// { children }은 props로 전달된 자식 컴포넌트들을 의미합니다. 리액트에서는 컴포넌트가 다른 컴포넌트를
// 감싸고 있을 때, 이 감싸진 컴포넌트들이 children으로 전달됩니다.
// <AuthProvider>로 <App> 컴포넌트를 감싸고 있기 때문에 <App> 컴포넌트가 children이 됩니다.
// 이렇게 하면 <App> 컴포넌트 내에서 AuthContext를 사용할 수 있게 됩니다.
export const AuthProvider = ({ children }) => {
  // isAuthenticated: 사용자가 인증된 상태인지 여부를 나타내는 상태 변수
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // name: 로그인된 사용자의 이름을 저장하는 상태 변수
  const [name, setName] = useState(''); // name 상태 추가

  // useEffect: 컴포넌트가 마운트될 때 한 번 실행됩니다.
  // 세션 스토리지에 JWT 토큰과 사용자 이름이 존재하는 경우, 이를 상태에 반영하여
  // 사용자가 인증된 상태로 설정합니다. 이렇게 설정하게 되면 사용자가 새로고침을 하더라도
  // 로그인 상태가 유지됩니다. 원래는 새로 고침하면 로그인 상태가 초기화되는데, 이를 방지하기 위함입니다.
  // 왜 새로고침하면 로그인 상태가 초기화 되나? 새로고침하면 컴포넌트가 다시 렌더링되기 때문에
  // 그리고 이 정보는 다른 모든 컴포넌트에서 사용할 수 있습니다.
  useEffect(() => {
    // 세션스토리지에 JWT 토큰이 존재하면 인증된 상태로 설정
    const token = sessionStorage.getItem('jwt');
    const storedName = sessionStorage.getItem('name');

    if (token) {
      setIsAuthenticated(true);
      setName(storedName); // 저장된 name을 상태에 설정
    }
  }, []);

  // LoginComponent에서 사용할 login 함수 정의
  // login 함수: 사용자가 로그인할 때 호출되어 로그인 성공시 JWT 토큰과 사용자 이름을 세션 스토리지에 저장하고,
  // 인증 상태와 사용자 이름 상태를 업데이트합니다.
  const login = (token, name, memberId) => {
    sessionStorage.setItem('jwt', token);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('memberId', memberId);
    setIsAuthenticated(true);
    setName(name);
  };

  // logout 함수: 사용자가 로그아웃할 때 호출됩니다.
  // 세션 스토리지에서 JWT 토큰과 사용자 이름을 제거하고,
  // 인증 상태와 사용자 이름 상태를 초기화합니다.
  const logout = () => {
    sessionStorage.removeItem('jwt');   // JWT 토큰 제거
    sessionStorage.removeItem('name');  // name 제거
    sessionStorage.removeItem('memberId');  // name 제거
    setIsAuthenticated(false);          // 인증 상태 초기화
    setName('');                        // 사용자 이름 초기화
  };

  // AuthContext.Provider: AuthContext를 사용하여 전역 상태를 자식 컴포넌트에 제공합니다.
  // value로 전달되는 객체는 로그인 상태, 사용자 이름, 로그인 및 로그아웃 함수입니다.
  return (
    <AuthContext.Provider value={{ isAuthenticated, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};  // AuthProvider 컴포넌트 끝

// AuthContext를 사용하기 위한 useAuth Custom Hook
// useContext()는 React에서 제공하는 훅(Hook) 중 하나로 이 훅은 Context 객체를 받아서,
// 그 Context의 현재 값을 반환합니다. 여기서 useContext(AuthContext)는 AuthContext라는
// Context 객체의 현재 값을 반환하는 역할을 합니다.
// 다른 컴포넌트에서 이 훅을 사용하여 간단히 AuthContext가 가진 인증 상태와 로그인/로그아웃
// 기능에 접근할 수 있습니다.
// useContext(AuthContext)는 AuthContext에서 제공하는 값을 가져옵니다.
// 이 값은 AuthProvider 컴포넌트에서 AuthContext.Provider를 통해 설정된 값입니다.
// 이 값은 일반적으로 객체 형태로, 해당 Context에 저장된 상태와 함수들을 포함하고 있습니다.
export const useAuth = () => useContext(AuthContext);
