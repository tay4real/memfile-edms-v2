import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { AppDispatch } from './app/store';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './features/auth/authSlice';

import { fetchBackend } from './services/axios';
import Spinner from './components/Spinner';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [rehydrated, setRehydrated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('accessToken');

    if (user && token) {
      dispatch(
        setUser({
          user: JSON.parse(user),
          accessToken: token,
        })
      );
      fetchBackend.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    setRehydrated(true);
  }, []);

  if (!rehydrated) return <Spinner />; // Optional: use Spinner

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
