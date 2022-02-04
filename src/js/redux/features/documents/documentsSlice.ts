import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

type Format = 'PDF'|'AI';

export type PlacedImage = {
    name:string,
    path:string,
    checked:boolean
};

export type Document = {
    name:string,
    path:string,
    exportPath:string,
    checked:boolean,
    isExport:boolean,
    format:Format,
    images:PlacedImage[]
};

interface DocumentsState {
    value:Document[]
}

const initialState:DocumentsState = {
  value: []
};

const getIndex = (docs:Document[], docPath:string) => docs.findIndex(s => s.path === docPath);

const documentsSlice = createSlice({
  name: 'documents',
  initialState,
  reducers: {
    /*
    load document from Illustrator
    */
    loadDocument: (state, action:PayloadAction<Document>) => {
      state.value = [...state.value, action.payload];
    },
    /* initialize all of documents */
    resetDocus: (state, action) => {
      state.value = [];
    },
    /*
        switching check on image
    */
    checkImage: (state, action:PayloadAction<{docPath:string, ImgIndex:number, checked:boolean}>) => {
      const docIndex = getIndex(state.value, action.payload.docPath);
      if (docIndex === undefined) return;
      state.value[docIndex].images[action.payload.ImgIndex].checked = action.payload.checked;
    },
    setExportPath: (state, action:PayloadAction<{docPath:string, exportPath:string}>) => {
      const docIndex = getIndex(state.value, action.payload.docPath);
      if (docIndex === undefined) return;
      state.value[docIndex].exportPath = action.payload.exportPath;
    },
    setExportOption: (state, action:PayloadAction<{docPath:string, checked:boolean}>) => {
      const docIndex = getIndex(state.value, action.payload.docPath);
      if (docIndex === undefined) return;
      state.value[docIndex].isExport = action.payload.checked;
    },
    setFormat: (state, action:PayloadAction<{docPath:string, format:Format}>) => {
      const docIndex = getIndex(state.value, action.payload.docPath);
      if (docIndex === undefined) return;
      state.value[docIndex].format = action.payload.format;
    }
  }
});

export const { loadDocument, resetDocus, checkImage, setExportPath, setExportOption, setFormat } = documentsSlice.actions;

export const documents = (state:RootState) => state.documents;

export default documentsSlice.reducer;
