import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { MainContainer } from '../../../styles/containers';
import { StdButton } from '../../parts/buttons';
import { showWindow } from '../../redux/features/windowMode/windowSlice';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { loadDocument, deleteDocs } from '../../redux/features/documents/documentsSlice';
import { SendHostScript } from '../../fileSystem/connectHostScript';
import useWatch from './watchHooks/useWatch';
// import { resolveFilePath } from '../../fileSystem/resolveFIlePath';
// import { writeDebugData } from '../../fileSystem/init';

const { FooterCompo } = MainContainer;

const ButtonWrapper = styled.ul`
    display: flex;
    justify-content:flex-start;
    list-style: none;
    align-items: center;
    padding: 0;
    margin: 0;
    height: 100%;
    & > li{
        margin-left: 5px;
        width:100%;

    }
`;

type InitDoc = {
  name:string,
  path:string,
  checked:false,
  images:{
    name:string,
    path:string,
    checked:false
  }[]
}

const Footer = () => {
  const { launchWatch } = useWatch();
  const theme = useContext(ThemeContext);
  const btnColor = theme.gray;
  const dispatch = useAppDispatch();
  const documents = useAppSelector(state => state.documents.value);
  const options = useAppSelector(state => state.options.value);
  const loadDocumentFromAI = async () => {
    const connect = new SendHostScript('getDocument.jsx');
    const r = await connect.callJsx();
    console.log(r);
    if (r === 'false' || typeof r === 'boolean') return;
    const doc:InitDoc = JSON.parse(r);
    doc.images = doc.images.reduce((acc, current) => {
      console.log(acc.some(a => a.path === current.path));
      if (acc.some(a => a.path === current.path)) return acc;
      // current.path = resolveFilePath(current.path);
      return [...acc, { ...current }];
    }, []);
    console.log(doc);
    dispatch(loadDocument(
      {
        ...doc,
        exportPath: '',
        isExport: false,
        format: 'PDF'
      }));
  };
  return (
      <FooterCompo>
          <ButtonWrapper>
            <li>
              <StdButton func={() => launchWatch(documents)} color={theme.green} name='watch' />
            </li>
            <li>
              <StdButton func={loadDocumentFromAI} color={btnColor} name='load' />
            </li>
            <li>
              <StdButton func={() => dispatch(deleteDocs())} color={btnColor} name='delete' />
            </li>
            <li>
              <StdButton func={async () => {
                const targets = documents.filter(doc => doc.checked === true);
                if (targets.length < 1) return;
                const connect = new SendHostScript();
                /*
                await writeDebugData({
                  documents,
                  func: 'open',
                  options
                });
                */
                const r = await connect.callHostScript({
                  documents,
                  func: 'open',
                  options
                });
                console.log(r);
              }} color={btnColor} name='open' />
            </li>
            <li>
              <StdButton func={() => dispatch(showWindow('options'))} color={btnColor} name='options' />
            </li>
          </ButtonWrapper>
      </FooterCompo>
  );
};

export default Footer;
