import React, { FC, useContext, useCallback } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Document, checkDoc, setExportOption, setFormat, Format, setExportPath } from '../../redux/features/documents/documentsSlice';
import { turnOnPage } from '../../redux/features/pages/imagePage';
import { SendHostScript } from '../../fileSystem/connectHostScript';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';

import { StdCheckBox, SimpleCheckBox } from '../../parts/checkBoxes';
import { StdRadioBox } from '../../parts/radioBoxes';
import { PathBox, ExportPathBox } from '../../parts/pathBox';
import { SwitchButton } from '../../parts/buttons';

const TitleWrapper = styled.div`
    display: flex;
    margin: 5px;
    justify-content: flex-start;
`;

const Title = styled.h4`
    color: #fff;
    font-weight: 300;
    font-size: 15px;
    padding: 0;
    margin: 0;
    margin-left: 10px;
`;

const DocumentBoxBase = styled.div<{color:string}>`
    width: 360px;
    height: 130px;
    padding: 5px;
    box-sizing: border-box;
    box-shadow: 3px 3px 3px rgba(0,0,0,0.2);
    background: ${props => props.color};
    margin: auto;
    margin-bottom: 5px;
`;

const OptionalWrapper = styled.div`
    display: flex;
    justify-content:space-around;
`;

const RadioWrapper = styled.div`
    width: 120px;
    margin: 0px 5px;
    display: flex;
    justify-content: space-around;
`;

type DocumentBoxProps = Omit<Document, 'images'>;

const DocumentBox:FC<DocumentBoxProps> = (doc) => {
  const dispatch = useAppDispatch();
  const theme = useContext(ThemeContext);
  const docs = useAppSelector(state => state.documents.value);
  const handleCheckDoc = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(checkDoc({ docPath: doc.path, checked: e.target.checked }));
  }, [doc]);
  const handleIsExport = useCallback((e:React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setExportOption({ docPath: doc.path, checked: e.target.checked }));
  }, [doc]);
  const handleRadio = useCallback((name:Format) => dispatch(setFormat({ docPath: doc.path, format: name })), [doc]);

  const turnOnImageWindow = () => {
    const index = docs.findIndex(d => d.path === doc.path);
    if (index === undefined) return;
    dispatch(turnOnPage(index));
  };

  const getExportPathFromJSX = async () => {
    const connect = new SendHostScript('getFolderPath.jsx');
    const filePath = await connect.callJsx();
    if (typeof filePath === 'boolean' || filePath === 'false') return;
    dispatch(setExportPath({ docPath: doc.path, exportPath: filePath }));
  };
  return (
      <DocumentBoxBase color={theme.gray}>
          <TitleWrapper>
            <StdCheckBox checked={doc.checked} func={handleCheckDoc} />
            <Title>{doc.name}</Title>
          </TitleWrapper>
          <PathBox filePath={doc.path} />
          <ExportPathBox filePath={doc.exportPath} checked={doc.isExport} func={getExportPathFromJSX} />
          <OptionalWrapper>
            <SimpleCheckBox checked={doc.isExport} func={handleIsExport} />
            <RadioWrapper>
              <StdRadioBox func={handleRadio} checked={doc.format === 'PDF'} name='PDF' />
              <StdRadioBox func={handleRadio} checked={doc.format === 'AI'} name='AI' />
            </RadioWrapper>
            <SwitchButton name='images' func={turnOnImageWindow} />
          </OptionalWrapper>
      </DocumentBoxBase>
  );
};

export default DocumentBox;
