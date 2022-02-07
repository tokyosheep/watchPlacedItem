import { configureStore } from '@reduxjs/toolkit';
import documentsSlice from '../features/documents/documentsSlice';
import imagePageSlice from '../features/pages/imagePage';

export const store = configureStore({
  reducer: {
    documents: documentsSlice,
    imagePageStatus: imagePageSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
