import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { MDAState, MDA } from './types';
import { createMDAAPI, fetchAllMDAsAPI } from '../../services/mdaAPI';

const initialState: MDAState = {
  mdas: [],
  mda: null,
  loading: false,
  error: null,
};

// Thunk to fetch all MDAs
export const fetchAllMDAs = createAsyncThunk(
  'mdas/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await fetchAllMDAsAPI();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
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
      return thunkAPI.rejectWithValue(error.message);
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
    },
  },
  extraReducers: (builder) => {
    builder
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

      .addCase(createMDA.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMDA.fulfilled, (state, action: PayloadAction<MDA>) => {
        state.loading = false;
        state.mda = action.payload;
        state.mdas.push(action.payload);
      })
      .addCase(createMDA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearMDAState } = mdaSlice.actions;

export default mdaSlice.reducer;
