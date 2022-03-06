import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type FloatBoxProp = {
  msg:string,
  visible:boolean,
  x:number,
  y:number
}

interface FloatState {
  value:FloatBoxProp
}

const initialState:FloatState = {
  value: {
    msg: '',
    visible: false,
    x: 0,
    y: 0
  }
}

const floatSlice = createSlice({
  name: 'floatbox',
  initialState,
  reducers: {
    enterArea: (state, action:PayloadAction<Omit<FloatBoxProp, 'visible'>>) => {
      state.value = { ...action.payload, visible: true };
    },
    leaveArea: (state, action:PayloadAction<null>) => {
      state.value.visible = false;
    },
    setPosition: (state, action:PayloadAction<{x:number, y:number}>) => {
      state.value = { ...state.value, ...action.payload };
    }
  }
});

export const { leaveArea, setPosition, enterArea } = floatSlice.actions;

export const floatBox = (state:RootState) => state.floatbox;

export default floatSlice.reducer;
