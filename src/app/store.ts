import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import deptReducer from '../features/departments/deptSlice';
import mdaReducer from '../features/mdas/mdaSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    departments: deptReducer,
    mdas: mdaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
