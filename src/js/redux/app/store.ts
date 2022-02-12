import { configureStore } from '@reduxjs/toolkit';
import documentsSlice from '../features/documents/documentsSlice';
import imagePageSlice from '../features/pages/imagePage';
import optionsSlice from '../features/options/optionSlice';
import windowSlice from '../features/windowMode/windowSlice';

export const store = configureStore({
  reducer: {
    documents: documentsSlice,
    imagePageStatus: imagePageSlice,
    options: optionsSlice,
    windows: windowSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
