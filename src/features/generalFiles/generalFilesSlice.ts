import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTotalGeneralFiles } from '@/services/generalFilesAPI';
import { GeneralFilesCounts } from './types';

interface GeneralFilesState {
  counts: GeneralFilesCounts | null;
  loading: boolean;
  error: string | null;
}

const initialState: GeneralFilesState = {
  counts: null,
  loading: false,
  error: null,
};

export const fetchGeneralFilesCounts = createAsyncThunk(
  'generalFiles/fetchCounts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getTotalGeneralFiles();
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || 'Failed to fetch counts');
    }
  }
);

const generalFilesSlice = createSlice({
  name: 'generalFiles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch General Files Counts
      .addCase(fetchGeneralFilesCounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeneralFilesCounts.fulfilled, (state, action) => {
        state.counts = action.payload;
        state.loading = false;
      })
      .addCase(fetchGeneralFilesCounts.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default generalFilesSlice.reducer;
