import { configureStore } from '@reduxjs/toolkit';
import documentsSlice from '../features/documents/documentsSlice';
import imagePageSlice from '../features/pages/imagePage';
import optionsSlice from '../features/options/optionSlice';
import windowSlice from '../features/windowMode/windowSlice';
import floatSlice from '../features/floatBox/floatBoxSlice';

export const store = configureStore({
  reducer: {
    documents: documentsSlice,
    imagePageStatus: imagePageSlice,
    options: optionsSlice,
    windows: windowSlice,
    floatbox: floatSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
