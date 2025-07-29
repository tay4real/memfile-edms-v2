export interface OutgoingMailStats {
  _id: number;
  total: number;
}

export interface OutgoingMailCount {
  total: number;
}

export interface OutgoingMailState {
  stats: OutgoingMailStats[];
  counts: OutgoingMailCount | null;
  loading: boolean;
  error: string | null;
}
