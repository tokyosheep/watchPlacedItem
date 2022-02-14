import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { useAppDispatch } from '../../redux/app/hooks';
import { checkAllImgs } from '../../redux/features/documents/documentsSlice';
import { ImageContainer } from '../../../styles/containers';
import { StdButton } from '../../parts/buttons';
const { FooterCompo } = ImageContainer;

const ButtonWrapper = styled.ul`
    display: flex;
    justify-content:flex-start;
    align-items: center;
    list-style: none;
    padding: 0;
    margin: 0;
    & >li{
        margin-right: 5px;
    }
`;

const ImageBox:FC<{docPath:string|null}> = ({ docPath }) => {
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const allSwitching:(v:boolean)=>void = flag => {
    if (docPath === null) return;
    dispatch(checkAllImgs({ docPath, checked: flag }));
  };
  return (
      <FooterCompo>
          <ButtonWrapper>
            <li>
                <StdButton color={theme.darkGray} name='All on' func={() => allSwitching(true)} />
            </li>
            <li>
                <StdButton color={theme.darkGray} name='All off' func={() => allSwitching(false)} />
            </li>
          </ButtonWrapper>
      </FooterCompo>
  );
};

export default ImageBox;
