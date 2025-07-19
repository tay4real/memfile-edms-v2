import React, { ReactNode } from 'react';
import { useSelector, UseSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from 'src/app/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
