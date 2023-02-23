import { configureStore } from '@reduxjs/toolkit';
import rocketReducer from './features/rocket/rocketSlice';

/* eslint-disable import/prefer-default-export */
export const store = configureStore({
  reducer: {
    rocket: rocketReducer,
  },
});
