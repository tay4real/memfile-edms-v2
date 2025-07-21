import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from 'src/app/store';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}: ProtectedRouteProps) => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    // Store the current location the user is trying to access
    return <Navigate to={'/login'} replace state={{ from: location }} />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
