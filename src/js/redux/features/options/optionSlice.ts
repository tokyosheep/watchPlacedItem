import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export type PDFValues = 'ACROBAT4'|'ACROBAT5'|'ACROBAT6'|'ACROBAT7'|'ACROBAT8';

type OptionsType = {
    pdfver: PDFValues,
    isClose: boolean,
    timeStamp: boolean
}

interface OptionState {
    value: OptionsType
}
const emps = new Array(5).fill('');
export const PDFvers = emps.map((emp, i) => 'ACROBAT' + (i + 4));

const initialState:OptionState = {
  value: {
    pdfver: 'ACROBAT7',
    isClose: true,
    timeStamp: false
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
