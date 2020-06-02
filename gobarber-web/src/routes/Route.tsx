import React from 'react';
import { RouteProps as ReactRouterProps, Route as ReactRouterRoute, Redirect } from 'react-router-dom';

import { useAuth } from '../hooks';

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...props }) => {
  const { user } = useAuth();

  return (
    <ReactRouterRoute
      {...props}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard', state: { from: location } }} />
        );
      }}
    />
  );
};

export default Route;
