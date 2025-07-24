export interface MDA {
  _id?: string;
  name: string;
  shortName: string;
}

export interface MDAState {
  mdas: MDA[];
  mda: MDA | null;
  loading: boolean;
  error: string | null;
  successMessage?: string | null;
}
