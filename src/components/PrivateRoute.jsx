import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../stores/selectors.js';

function PrivateRoute({ element: Element }) {
  const isAuth = useSelector(selectIsAuthenticated);
  return isAuth ? Element : <Navigate to={'/login'} />;
}

export default PrivateRoute;