import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type ImageWindow = {
    isPageOn:boolean,
    docIndex:number
};

interface ImagePageState {
    value: ImageWindow
}

const initialState:ImagePageState = {
  value: {
    isPageOn: false,
    docIndex: 0
  }
};

const imagePageSlice = createSlice({
  name: 'imagePageState',
  initialState,
  reducers: {
    turnOnPage: (state, action:PayloadAction<number>) => {
      state.value = { isPageOn: true, docIndex: action.payload };
    },
    turnOffPage: (state) => {
      state.value.isPageOn = false;
    }
  }
});

export const { turnOnPage, turnOffPage } = imagePageSlice.actions;

export const imagePageStatus = (state:RootState) => state.imagePageStatus;

export default imagePageSlice.reducer;
