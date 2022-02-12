import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Windows = {
    options:boolean,
    loading:boolean
}

export type WindowKeys = keyof Windows;

interface WindowState {
    value:Windows
}

const initialState:WindowState = {
  value: {
    options: false,
    loading: false
  }
}

const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    closeWindow: (state, action:PayloadAction<WindowKeys>) => {
      state.value[action.payload] = false;
    },
    showWindow: (state, action:PayloadAction<WindowKeys>) => {
      state.value[action.payload] = true;
    }
  }
});

export const { closeWindow, showWindow } = windowSlice.actions;

export const windows = (state:RootState) => state.windows.value;

export default windowSlice.reducer;
