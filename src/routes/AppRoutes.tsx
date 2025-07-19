import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Spinner from '../components/Spinner';
import ProtectedRoute from './ProtectedRoute';

// Adjusted paths (feature-based)
const Login = lazy(() => import('../features/auth/Login'));
const Page404 = lazy(() => import('../components/Page404')); // You can move it to components or features
const DefaultLayout = lazy(() => import('../components/Layout')); // Layout component

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/404' element={<Page404 />} />
        <Route
          path='/*'
          element={
            <ProtectedRoute>
              <DefaultLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
