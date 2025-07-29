import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DeptState, Department } from './types';
import { fetchDeptsAPI, createDeptAPI } from '../../services/deptAPI';

const initialState: DeptState = {
  depts: null,
  dept: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Async thunk to fetch departments
export const fetchAllDepts = createAsyncThunk(
  'departments/fetchAll',
  async ({ mdaID }: { mdaID: string }, thunkAPI) => {
    try {
      const response = await fetchDeptsAPI(mdaID);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data || error.message || 'An unexpected error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk to create department
export const createDept = createAsyncThunk(
  'departments/create',
  async ({ mdaID, dept }: { mdaID: string; dept: Department }, thunkAPI) => {
    try {
      const response = await createDeptAPI(mdaID, dept);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data || error.message || 'An unexpected error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const deptSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {
    clearDeptState(state) {
      state.dept = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllDepts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllDepts.fulfilled,
        (state, action: PayloadAction<Department[]>) => {
          state.loading = false;
          state.depts = action.payload;
        }
      )
      .addCase(fetchAllDepts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createDept.pending, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(
        createDept.fulfilled,
        (state, action: PayloadAction<Department>) => {
          state.loading = false;
          state.dept = action.payload;
          state.depts = state.depts
            ? [...state.depts, action.payload]
            : [action.payload];
          state.successMessage = 'Department created successfully';
        }
      )
      .addCase(createDept.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearDeptState } = deptSlice.actions;

export default deptSlice.reducer;
