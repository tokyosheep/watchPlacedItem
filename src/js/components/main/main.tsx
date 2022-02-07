import React from 'react';
import styled from 'styled-components';
import DocumentBox from './main_docBox';
import { useAppSelector } from '../../redux/app/hooks';
import { MainContainer } from '../../../styles/containers';
const { MainCompo } = MainContainer;

const ListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const MainContents = () => {
  const documents = useAppSelector(state => state.documents.value);
  const documentList = documents.map((doc, i) => {
    return (
        <li key={i}>
            <DocumentBox {...doc}/>
        </li>
    );
  });
  return (
      <MainCompo>
          <ListWrapper>
              {documentList}
          </ListWrapper>
      </MainCompo>
  );
};

export default MainContents;
