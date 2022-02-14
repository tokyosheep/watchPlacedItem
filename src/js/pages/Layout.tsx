import React, { useMemo } from 'react';

import OptionsPage from './options';
import MainPage from './mainPage';
import ImagePage from './image';
import LoadingLayer from '../components/loading/loading';

import { init } from '../fileSystem/init';

const Layout = () => {
  useMemo(() => {
    init();
  }, []);
  return (
      <>
        <LoadingLayer />
        <OptionsPage />
        <ImagePage />
        <MainPage />
      </>
  );
};

export default Layout;
