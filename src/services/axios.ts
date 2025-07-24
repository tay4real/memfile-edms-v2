import axios from 'axios';
import { logout } from './auth';

const baseURL =
  import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_BACKEND_URL
    : import.meta.env.VITE_DEV_BACKEND_URL;

export const fetchBackend = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
fetchBackend.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptor for refresh token
fetchBackend.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Token expired - try refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('Missing refresh token');
        }

        const { data } = await axios.post(`${baseURL}/auth/refresh-token`, {
          token: refreshToken,
        });

        localStorage.setItem('accessToken', data.accessToken);

        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return fetchBackend(originalRequest);
      } catch (refreshError: any) {
        console.error(
          '🔴 Token refresh failed:',
          refreshError?.response?.data || refreshError.message
        );

        // Optional: Show user-friendly message or redirect
        logout(); // ⛔ Logout only if really necessary
      }
    }

    return Promise.reject(error);
  }
);
