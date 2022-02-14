import React from 'react';
import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';
import { closeWindow } from '../../redux/features/windowMode/windowSlice';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';

const OverLayer = styled.div<{visible:boolean}>`
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    background: rgba(0,0,0,0.8);
    display: ${props => props.visible ? 'block' : 'none'};
`;

const ButtonColor = '#ff16b1';

const StopButton = styled.button`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    width: 150px;
    height: 30px;
    background: ${ButtonColor};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    &:active{
        background: ${props => darken(0.2, ButtonColor)};
    }
`;

const fading = keyframes`
    0%{
        opacity: 0.7;
    }

    50%{
        opacity: 1;
    }

    100%{
        opacity: 0.7;
    }
`;

const LoadingTitle = styled.span`
    color: #fff;
    font-size: 25px;
    font-weight: 300;
    display: block;
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    animation: ${fading} .6s linear infinite;
`;

const LoadingLayer = () => {
  const dispatch = useAppDispatch();
  const isLoad = useAppSelector(state => state.windows.value.loading);
  return (
      <OverLayer visible={isLoad}>
          <LoadingTitle>
              Watching...
          </LoadingTitle>
          <StopButton
            onClick={() => dispatch(closeWindow('loading'))}
          >Stop Watch
          </StopButton>
      </OverLayer>
  )
}

export default LoadingLayer;
