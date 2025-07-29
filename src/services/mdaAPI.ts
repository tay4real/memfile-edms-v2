import { MDA } from '@/features/mdas/types';
import { fetchBackend } from './axios';

export const fetchAllMDAsAPI = () => {
  return fetchBackend.get(`/mdas`);
};

export const createMDAAPI = (mda: MDA) => {
  return fetchBackend.post('/mdas', mda);
};

export const deleteMDAAPI = (id: string) => {
  return fetchBackend.delete(`/mdas/${id}`);
};

export const fetchMDAByIdAPI = (id: string) => fetchBackend.get(`/mdas/${id}`);

export const updateMDAAPI = (id: string, data: Partial<MDA>) =>
  fetchBackend.put(`/mdas/${id}`, data);
