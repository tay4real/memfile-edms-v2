import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IncomingMailsState } from './types';
import {
  getIncomingMailCounts,
  getIncomingMailStats,
} from '@/services/incomingMailsAPI';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const fetchIncomingMailStats = createAsyncThunk(
  'outgoingMails/fetchStats',
  async (_, thunkAPI) => {
    try {
      return await getIncomingMailStats();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Error fetching stats');
    }
  }
);

export const fetchIncomingMailCounts = createAsyncThunk(
  'incomingMails/getCounts',
  async (_, thunkAPI) => {
    try {
      return await getIncomingMailCounts();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Error fetching incoming mail counts'
      );
    }
  }
);

const initialState: IncomingMailsState = {
  stats: [],
  counts: { total: 0 },
  loading: false,
  error: null,
};

const incomingMailsSlice = createSlice({
  name: 'incomingMails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Stats
      .addCase(fetchIncomingMailStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomingMailStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchIncomingMailStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Counts
      .addCase(fetchIncomingMailCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncomingMailCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.counts = action.payload;
      })
      .addCase(fetchIncomingMailCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default incomingMailsSlice.reducer;
