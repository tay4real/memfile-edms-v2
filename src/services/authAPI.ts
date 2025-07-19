import { fetchBackend } from './axios';

export const loginAPI = (credentials: { email: string; password: string }) => {
  return fetchBackend.post('/auth/login', credentials);
};

export const fetchCurrentUserAPI = () => {
  return fetchBackend.get('/users/me');
};
