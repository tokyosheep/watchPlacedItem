import React, { useMemo } from 'react';

import OptionsPage from './options';
import MainPage from './mainPage';
import ImagePage from './image';

import { init } from '../fileSystem/init';

const Layout = () => {
  useMemo(() => {
    init();
  }, []);
  return (
      <>
        <OptionsPage />
        <ImagePage />
        <MainPage />
      </>
  );
};

export default Layout;
