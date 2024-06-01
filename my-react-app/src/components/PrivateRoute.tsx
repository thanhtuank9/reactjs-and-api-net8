import React from 'react';
import { Route, Navigate, RouteProps } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface PrivateRouteProps extends RouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
