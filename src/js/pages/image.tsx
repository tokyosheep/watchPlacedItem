import React from 'react';
import { useAppSelector } from '../redux/app/hooks';

import Footer from '../components/imageBox/footer';
import Header from '../components/imageBox/header';
import ImageMain from '../components/imageBox/main';
import { ImageContainer } from '../../styles/containers';
const { Container } = ImageContainer;

const ImagePage = () => {
  const documents = useAppSelector(state => state.documents);
  const pageStatus = useAppSelector(state => state.imagePageStatus);
  const doc = documents.value.length !== 0 ? documents.value[pageStatus.value.docIndex] : null;
  return (
      <Container switch={pageStatus.value.isPageOn}>
          <Header />
          {doc === null ? '' : <ImageMain images={doc.images} docPath={doc.path} />}
          <Footer docPath={doc?.path ?? null} />
      </Container>
  );
};

export default ImagePage;
