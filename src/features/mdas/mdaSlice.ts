import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MDAState, MDA } from './types';
import {
  createMDAAPI,
  fetchAllMDAsAPI,
  deleteMDAAPI,
} from '../../services/mdaAPI';

const initialState: MDAState = {
  mdas: [],
  mda: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Thunk to fetch all MDAs
export const fetchAllMDAs = createAsyncThunk(
  'mdas/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllMDAsAPI();
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data || error.message || 'An unexpected error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk to create an MDA
export const createMDA = createAsyncThunk(
  'mdas/create',
  async (mda: MDA, thunkAPI) => {
    try {
      const response = await createMDAAPI(mda);
      return response.data;
    } catch (error: any) {
      const message =
        error.response?.data || error.message || 'An unexpected error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Thunk to delete an MDA
export const deleteMDA = createAsyncThunk(
  'mdas/delete',
  async (id: string, thunkAPI) => {
    try {
      await deleteMDAAPI(id);
      return id;
    } catch (error: any) {
      const message =
        error.response?.data || error.message || 'An unexpected error occurred';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const mdaSlice = createSlice({
  name: 'mdas',
  initialState,
  reducers: {
    clearMDAState(state) {
      state.mda = null;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all MDAs handlers
      .addCase(fetchAllMDAs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllMDAs.fulfilled,
        (state, action: PayloadAction<MDA[]>) => {
          state.loading = false;
          state.mdas = action.payload;
        }
      )
      .addCase(fetchAllMDAs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create MDA handlers
      .addCase(createMDA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMDA.fulfilled, (state, action: PayloadAction<MDA>) => {
        state.loading = false;
        state.mda = action.payload;
        state.mdas.push(action.payload);
        state.successMessage = 'MDA created successfully';
      })
      .addCase(createMDA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Delete MDA handlers
      .addCase(deleteMDA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMDA.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.mdas = state.mdas.filter((mda) => mda._id !== action.payload);
        state.successMessage = 'MDA deleted successfully';
      })
      .addCase(deleteMDA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMDAState } = mdaSlice.actions;

export default mdaSlice.reducer;
