import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ element: Element, roles, ...rest }) => {
  const { isAuthenticated, member } = useAuth();

  const hasRole = member.roles.some(role => roles.includes(role.authority));

  return isAuthenticated && hasRole ?
    <Element {...rest} /> :
    <Navigate to="/login" replace />;
};

export default PrivateRoute;
