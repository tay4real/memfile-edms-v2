import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../app/store';

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect unauthenticated users to login, preserving the location
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;
