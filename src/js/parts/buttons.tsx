import React, { FC } from 'react';
import styled from 'styled-components';
import { CenterPlace } from '../../styles/mixin';
import { darken } from 'polished';

const StdButtonBody = styled.button<{width:number, height:number, color:string}>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    background: ${props => props.color};
    position: relative;
    border: none;
    display: block;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    &:active{
        background: ${props => darken(0.2, props.color)};
    }
`;

const ButtonName = styled.span`
    display: block;
    color: #fff;
    font-size: 13px;
    font-weight: 200;
    ${CenterPlace};
`;

type StdButtonProps = {
    name:string,
    func:() => void,
    color:string,
    width?:number,
    height?:number
}

export const StdButton:FC<StdButtonProps> = ({ name, func, color, height = 20, width = 70 }) => {
  return (
      <StdButtonBody color={color} width={width} height={height} onClick={func}>
          <ButtonName>{name}</ButtonName>
      </StdButtonBody>
  );
};

const SwitchButtonBody = styled.button`
    width: 90px;
    height: 20px;
    background: #597AC6;
    border-radius: 3px;
    position: relative;
    border: none;
    cursor: pointer;
    &:focus{
        outline: none;
    }
    &:active{
        background: ${darken(0.2, '#597AC6')};
    }
`;

const SwitchButtonTitle = styled.span`
    color: #fff;
    font-size: 13px;
    font-weight: 300;
    display: block;
    ${CenterPlace};
`;

type SwitchButtonProps = Omit<StdButtonProps, 'width'|'height'|'color'>

export const SwitchButton:FC<SwitchButtonProps> = ({ name, func }) => {
  return (
      <SwitchButtonBody onClick={func}>
          <SwitchButtonTitle>{name}</SwitchButtonTitle>
      </SwitchButtonBody>
  );
};
