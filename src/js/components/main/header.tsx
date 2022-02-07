import React from 'react';
import styled from 'styled-components';
import { MainContainer } from '../../../styles/containers';
const { HeaderCompo } = MainContainer;

const Title = styled.h1`
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 20px;
    font-weight: 300;
    margin-top: 5px;
    margin-left: 10px;
`;

const Header = () => {
  return (
      <HeaderCompo>
          <Title>
              Watch Images
          </Title>
      </HeaderCompo>
  );
};

export default Header;
