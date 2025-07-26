export interface Department {
  _id: string;
  deptName: string;
  deptShortName: string;
  mdaID?: string;
}

export interface DeptState {
  depts: Department[] | null;
  dept: Department | null;
  loading: boolean;
  error?: string | null;
}
