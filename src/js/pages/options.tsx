import React from 'react';
import { useAppSelector } from '../redux/app/hooks';
import Header from '../components/options/header';
import OptionsMain from '../components/options/OptionsMain';
import { OptionsContainer } from '../../styles/containers';

const { CoverLayer } = OptionsContainer;
const { Container } = OptionsContainer;

const OptionsPage = () => {
  const windowSwitch = useAppSelector(state => state.windows.value.options);
  return (
      <CoverLayer checked={windowSwitch}>
          <Container>
            <Header />
            <OptionsMain />
          </Container>
      </CoverLayer>
  );
}

export default OptionsPage;
