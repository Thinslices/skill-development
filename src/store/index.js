import { configureStore } from '@reduxjs/toolkit';
import studies from '../store/modules/studies';

export const store = configureStore({
  reducer: {
    studies
  },
});
