import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type PDFValues = 'ACROBAT4'|'ACROBAT5'|'ACROBAT6'|'ACROBAT7'|'ACROBAT8';

type OptionsType = {
    pdfver: PDFValues,
    isClose: boolean
}

interface OptionState {
    value: OptionsType
}

const initialState:OptionState = {
  value: {
    pdfver: 'ACROBAT7',
    isClose: true
  }
};

const optionSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setPdf: (state, action:PayloadAction<PDFValues>) => {
      state.value.pdfver = action.payload;
    },
    setBoolean: (state, action:PayloadAction<{prop: 'isClose', checked:boolean}>) => {
      state.value[action.payload.prop] = action.payload.checked;
    }
  }
});

export const { setPdf, setBoolean } = optionSlice.actions;

export const options = (state:RootState) => state.options;

export default optionSlice.reducer;
