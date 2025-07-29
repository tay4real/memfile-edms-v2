import { fetchBackend } from './axios';
import {
  OutgoingMailStats,
  OutgoingMailCount,
} from '@/features/outgoingMails/types';

export const getOutgoingMailStats = async (): Promise<OutgoingMailStats[]> => {
  const response = await fetchBackend.get('/outgoing-mails/report/stats');
  return response.data;
};

export const getOutgoingMailCounts = async (): Promise<OutgoingMailCount> => {
  const response = await fetchBackend.get('/outgoing-mails/report/counts');
  return response.data;
};
