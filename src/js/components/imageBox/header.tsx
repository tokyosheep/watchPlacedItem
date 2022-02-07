import React from 'react';
import styled from 'styled-components';
import { useAppDispatch } from '../../redux/app/hooks';
import { turnOffPage } from '../../redux/features/pages/imagePage'
import { ImageContainer } from '../../../styles/containers';
import { SwitchButton } from '../../parts/buttons';
const { HeaderCompo } = ImageContainer;

const TitleWrapper = styled.div`
    display: flex;
    justify-content:space-between;
    align-items:center;
    width: 100%;
    height: 100%;
    padding: 0px 10px;
    box-sizing:border;
`;

const Title = styled.h1`
    padding: 0;
    margin: 0;
    color: #fff;
    font-size: 15px;
    font-weight: 300;
    margin-top: 5px;
`;

const Header = () => {
  const dispatch = useAppDispatch();
  return (
      <HeaderCompo>
          <TitleWrapper>
            <Title>
                Placed images
            </Title>
            <SwitchButton name='docment' func={() => dispatch(turnOffPage())} />
          </TitleWrapper>
      </HeaderCompo>
  );
};

export default Header;
