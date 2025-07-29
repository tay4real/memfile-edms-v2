import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  OutgoingMailState,
  OutgoingMailStats,
  OutgoingMailCount,
} from './types';
import {
  getOutgoingMailStats,
  getOutgoingMailCounts,
} from '@/services/outgoingMailsAPI';

const initialState: OutgoingMailState = {
  stats: [],
  counts: null,
  loading: false,
  error: null,
};

export const fetchOutgoingMailStats = createAsyncThunk(
  'outgoingMails/fetchStats',
  async (_, thunkAPI) => {
    try {
      return await getOutgoingMailStats();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Error fetching stats');
    }
  }
);

export const fetchOutgoingMailCounts = createAsyncThunk(
  'outgoingMails/fetchCounts',
  async (_, thunkAPI) => {
    try {
      return await getOutgoingMailCounts();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Error fetching counts');
    }
  }
);

const outgoingMailsSlice = createSlice({
  name: 'outgoingMails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOutgoingMailStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutgoingMailStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchOutgoingMailStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchOutgoingMailCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOutgoingMailCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload;
      })
      .addCase(fetchOutgoingMailCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default outgoingMailsSlice.reducer;
