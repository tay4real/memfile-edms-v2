import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginAPI, fetchCurrentUserAPI } from '../../services/authAPI';

interface User {
  id: string;
  firstname: string;
  surname: string;
  email: string;
  role: string;
  post: string;
  generalfiles: string[];
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  loading: false,
  error: null,
};

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await loginAPI(credentials);

      // Save token to localStorage
      localStorage.setItem('accessToken', response.data.token);

      return response.data.user;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        'Username or Password is incorrect. Please try again.'
      );
    }
  }
);

// Async thunk to fetch user
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (_, thunkAPI) => {
    try {
      const response = await fetchCurrentUserAPI();
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message || 'Failed to fetch user'
      );
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFail: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = 'Login failed';
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // --- loginUser  handlers ---
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isLoggedIn = false;
      })

      // Handle logout action
      .addCase(logout, (state) => {
        state.isLoggedIn = false;
        state.user = null;
        state.error = null;
        localStorage.removeItem('accessToken'); // Clear token on logout
      })

      // --- fetchUser handlers ---
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.user = null;
        state.isLoggedIn = false;
      });
  },
});

export const { loginSuccess, loginFail, logout } = authSlice.actions;
export default authSlice.reducer;
