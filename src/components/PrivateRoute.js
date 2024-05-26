import React from 'react';
import { useAuth } from '../auth-context';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { currentUser } = useAuth();

  if (!currentUser && location.pathname !== `/app/login`) {
    return <Navigate to="/app/login" replace />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
