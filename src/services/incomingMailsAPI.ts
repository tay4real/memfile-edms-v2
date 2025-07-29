import { fetchBackend } from './axios';
import { MailStats, MailCounts } from '@/features/incomingMails/types';

export const getIncomingMailStats = async (): Promise<MailStats[]> => {
  const res = await fetchBackend.get('/incoming-mails/report/stats');
  return res.data;
};

export const getIncomingMailCounts = async (): Promise<MailCounts> => {
  const res = await fetchBackend.get('/incoming-mails/report/counts');
  return res.data;
};
