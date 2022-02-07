import React from 'react';
import Header from '../components/main/header';
import Footer from '../components/main/footer';
import MainContents from '../components/main/main';
import { MainContainer } from '../../styles/containers';

const { Container } = MainContainer;

const MainPage = () => {
  return (
      <Container>
          <Header />
          <MainContents />
          <Footer />
      </Container>
  );
};

export default MainPage;
