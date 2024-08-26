import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [member, setMember] = useState({ name: '', roles: [] });

  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    const storedName = sessionStorage.getItem('name');
    const storedRoles = sessionStorage.getItem('roles');

    if (token) {
      setIsAuthenticated(true);
      setMember({
        name: storedName || '',
        roles: parseRoles(storedRoles)
      });
    }
  }, []);

  const parseRoles = (rolesString) => {
    if (!rolesString) return [];
    try {
      const parsed = JSON.parse(rolesString);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error('Error parsing roles:', error);
      return [];
    }
  };

  const login = (token, name, roles) => {
    sessionStorage.setItem('jwt', token);
    sessionStorage.setItem('name', name);
    sessionStorage.setItem('roles', JSON.stringify(roles || []));
    setIsAuthenticated(true);
    setMember({ name, roles: roles || [] });
  };

  const logout = () => {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('roles');
    setIsAuthenticated(false);
    setMember({ name: '', roles: [] });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, member, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);