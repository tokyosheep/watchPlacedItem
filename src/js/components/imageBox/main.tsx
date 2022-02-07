import React, { FC } from 'react';
import styled from 'styled-components';
import { ImageContainer } from '../../../styles/containers';
import { PlacedImage } from '../../redux/features/documents/documentsSlice';
import ImageBox from './main_ImageBox';

const { MainCompo } = ImageContainer;

const ListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ImageMain:FC<{images: PlacedImage[], docPath:string}> = ({ images, docPath }) => {
  const imgList = images.map((img, i) => {
    return (
        <li key={i}>
            <ImageBox {...img} index={i} docPath={docPath} />
        </li>
    );
  });
  return (
      <MainCompo>
          <ListWrapper>
            {imgList}
          </ListWrapper>
      </MainCompo>
  );
};

export default ImageMain;
