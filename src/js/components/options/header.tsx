import React from 'react';
import styled from 'styled-components';

const Title = styled.h2`
    color: #fff;
    font-size: 15px;
    font-weight: 300;
`;

const HeaderWrapper = styled.header`
    width: 100%;
    height: 30px;
    margin: 5px;
`;

const Header = () => {
  return (
      <HeaderWrapper>
          <Title>Options</Title>
      </HeaderWrapper>
  )
}

export default Header;
