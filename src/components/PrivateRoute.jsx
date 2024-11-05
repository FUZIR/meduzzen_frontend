import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ element: Element }) {
  const token = useSelector(state => state.login.token);
  const isAuthenticated = Boolean(token);

  console.log('Token:', token);
  console.log('Is Authenticated:', isAuthenticated);

  return isAuthenticated ? Element : <Navigate to={'/login'} />;
}

export default PrivateRoute;