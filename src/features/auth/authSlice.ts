import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { loginAPI, fetchCurrentUserAPI } from '../../services/authAPI';

const userFromStorage = localStorage.getItem('user');
const token = localStorage.getItem('accessToken');

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
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: userFromStorage ? JSON.parse(userFromStorage) : null,
  accessToken: token || null,
  loading: false,
  error: null,
};

// Login thunk
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await loginAPI(credentials);

      const { accessToken, refreshToken, user } = response.data;

      // Save token to localStorage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      return user;
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
      state.accessToken = null;
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
    setUser: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>
    ) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;

      // Persist to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('accessToken', action.payload.accessToken);
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
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

export const { loginSuccess, loginFail, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
