import React, { useMemo } from 'react';

import MainPage from './mainPage';
import ImagePage from './image';

import { init } from '../fileSystem/init';

const Layout = () => {
  useMemo(() => {
    init();
  }, []);
  return (
      <>
        <ImagePage />
        <MainPage />
      </>
  );
};

export default Layout;
