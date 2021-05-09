import { configureStore } from '@reduxjs/toolkit';
import counterReducer     from './paintSlice';

export const store = configureStore({
  reducer: {
    paint: counterReducer,
  },
});
