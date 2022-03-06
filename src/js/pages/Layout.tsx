import React, { useMemo } from 'react';

import OptionsPage from './options';
import MainPage from './mainPage';
import ImagePage from './image';
import LoadingLayer from '../components/loading/loading';
import FloatBox from '../parts/floatingBox';

import { init } from '../fileSystem/init';
import { useAppSelector } from '../redux/app/hooks';

const Layout = () => {
  const floatProp = useAppSelector(state => state.floatbox.value);
  console.log(floatProp);
  useMemo(() => {
    init();
  }, []);
  return (
      <>
        <LoadingLayer />
        <FloatBox {...floatProp} />
        <OptionsPage />
        <ImagePage />
        <MainPage />
      </>
  );
};

export default Layout;
