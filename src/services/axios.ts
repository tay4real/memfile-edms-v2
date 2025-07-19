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

    // if token expired and we have'nt retried already
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${baseURL}/auth/refresh-token`, {
          token: refreshToken,
        });

        localStorage.setItem('accessToken', data.accessToken);

        // Attach new token and retry the original request
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return fetchBackend(originalRequest);
      } catch (refreshError) {
        console.log('Token refresh failed', refreshError);
        logout(); // if refresh fails, log user out
      }
    }
    return Promise.reject(error);
  }
);
