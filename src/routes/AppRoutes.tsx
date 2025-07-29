import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Spinner from '../components/Spinner';
import ProtectedRoute from './ProtectedRoute';

const Login = lazy(() => import('../features/auth/Login'));
const Page404 = lazy(() => import('../components/Page404'));
const DefaultLayout = lazy(() => import('../components/Layout'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const NewMDA = lazy(() => import('../features/mdas/pages/NewMDA'));
const NewDepartment = lazy(
  () => import('../features/departments/pages/NewDepartment')
);
const MDAsList = lazy(() => import('../features/mdas/pages/MDAsList'));

const EditMDA = lazy(() => import('../features/mdas/pages/EditMDA'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/*' element={<DefaultLayout />}>
          <Route index element={<Navigate to='/dashboard' replace />} />
          <Route
            path='dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path='mdas'
            element={
              <ProtectedRoute>
                <MDAsList />
              </ProtectedRoute>
            }
          />
          <Route
            path='mdas/create'
            element={
              <ProtectedRoute>
                <NewMDA />
              </ProtectedRoute>
            }
          />
          <Route
            path='mdas/edit/:id'
            element={
              <ProtectedRoute>
                <EditMDA />
              </ProtectedRoute>
            }
          />
          <Route
            path='departments/create'
            element={
              <ProtectedRoute>
                <NewDepartment />
              </ProtectedRoute>
            }
          />

          <Route path='*' element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
