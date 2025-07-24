import { MDA } from '../features/mdas/types';
import { fetchBackend } from './axios';

export const fetchAllMDAsAPI = () => {
  return fetchBackend.get(`http://localhost:4000/api/mdas`);
};

export const createMDAAPI = (mda: MDA) => {
  return fetchBackend.post('http://localhost:4000/api/mdas', mda);
};
