import { fetchBackend } from './axios';

export const getTotalGeneralFiles = () =>
  fetchBackend.get('/general-files/report/counts');
