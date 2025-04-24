import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './patientSlice';

const store = configureStore({
  reducer: {
    patient: patientReducer,
  },
});

export default store;

// Export store methods for use in SignalRService.js
export const dispatch = store.dispatch;
export const getState = store.getState;