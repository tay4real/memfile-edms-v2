export interface MailStats {
  _id: number;
  total: number;
}

export interface MailCounts {
  total: number;
}

export interface IncomingMailsState {
  stats: MailStats[];
  counts: MailCounts;
  loading: boolean;
  error: string | null;
}
