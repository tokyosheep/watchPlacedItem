import React, { FC, useCallback, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { StdCheckBox } from '../../parts/checkBoxes';
import { PlacedImage, checkImage } from '../../redux/features/documents/documentsSlice';
import { useAppDispatch } from '../../redux/app/hooks';
import { enterArea, leaveArea, setPosition } from '../../redux/features/floatBox/floatBoxSlice';

const TitleWrapper = styled.div`
    display: flex;
    justify-content:flex-start;
    overflow:hidden;
    width: 95%;
`;

const TitleRange = styled.div`
  width: 80%;
  height: 100%;
  overflow:hidden;
`;

const Title = styled.span`
    display: block;
    font-size: 13px;
    color: #fff;
    font-weight: 300;
    margin-left: 10px;
`;

const PathText = styled.span`
    color: #fff;
    font-size: 13px;
    font-weight: 300;
    white-space: nowrap;
`;

const ImageBoxBase = styled.div<{color:string}>`
    width: 380px;
    height: 55px;  
    padding: 5px;
    box-sizing:border-box;
    background: ${props => props.color};
    margin: auto;
    margin-bottom: 10px;
    overflow:hidden;
`;

const ImageBox:FC<PlacedImage&{index:number, docPath:string}> = (img) => {
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const handleCheckbox = useCallback((e) => {
    dispatch(checkImage({ docPath: img.docPath, ImgIndex: img.index, checked: e.target.checked }));
  }, [img]);
  return (
      <ImageBoxBase color={theme.gray}
        onMouseEnter={(e) => {
          dispatch(enterArea({
            msg: img.path,
            x: e.clientX,
            y: e.clientY
          }));
        }}
        onMouseMove={(e) => {
          dispatch(setPosition({
            x: e.clientX,
            y: e.clientY
          }));
        }}
        onMouseLeave={() => {
          dispatch(leaveArea());
        }}
      >
          <TitleWrapper>
              <StdCheckBox func={handleCheckbox} checked={img.checked} />
              <TitleRange>
                <Title>{img.name}</Title>
              </TitleRange>
          </TitleWrapper>
          <PathText>
              {img.path}
          </PathText>
      </ImageBoxBase>
  );
};

export default ImageBox;
