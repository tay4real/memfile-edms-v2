import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import deptReducer from '../features/departments/deptSlice';
import mdaReducer from '../features/mdas/mdaSlice';
import incomingMailsReducer from '../features/incomingMails/incomingMailsSlice';
import outgoingMailsReducer from '../features/outgoingMails/outgoingMailsSlice';
import generalFilesReducer from '../features/generalFiles/generalFilesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    departments: deptReducer,
    mdas: mdaReducer,
    incomingMails: incomingMailsReducer,
    outgoingMails: outgoingMailsReducer,
    generalFiles: generalFilesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
