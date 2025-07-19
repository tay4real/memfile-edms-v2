import { fetchBackend } from './axios';
import { Department } from '../features/departments/types';

export const fetchDeptsAPI = (mdaID: string) => {
  return fetchBackend.get(`/mdas/${mdaID}/departments`);
};

export const createDeptAPI = (mdaID: string, dept: Department) => {
  return fetchBackend.post(`/mdas/${mdaID}/departments`, dept);
};
