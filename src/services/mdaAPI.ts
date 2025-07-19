import axios from 'axios';
import { MDA } from '../features/mdas/types';

export const fetchAllMDAsAPI = () => {
  return axios.get(`localhost:4000/api/mdas`);
};

export const createMDAAPI = (mda: MDA) => {
  return axios.post('localhost:4000/api/mdas', mda);
};
