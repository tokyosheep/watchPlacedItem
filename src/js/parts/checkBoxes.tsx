import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { YAxe } from '../../styles/mixin';

const StdCheckBoxWrappper = styled.label<{color:string, checked:boolean}>`
    width: 40px;
    height: 15px;
    display: block;
    border-radius: 10px;
    position: relative;
    cursor:pointer;
    background: ${props => props.checked ? props.color : '#333'};
    transition: .3s linear;
    & > input{
        display: none;
    }
`;

const StdCheckBoxBall = styled.div<{checked:boolean}>`
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    top: 50%;
    transition: .3s linear;
    transform: translateY(-50%);
    left: ${props => props.checked ? (40 - 15) + 'px' : '3px'};
`;

type StdCheckProps = {
    checked:boolean,
    func:(e: React.ChangeEvent<HTMLInputElement>) => void
}

export const StdCheckBox:FC<StdCheckProps> = ({ checked, func }) => {
  const theme = useContext(ThemeContext);
  return (
      <StdCheckBoxWrappper checked={checked} color={theme.green} >
          <input type='checkbox' checked={checked} onChange={(e) => func(e)} />
          <StdCheckBoxBall checked={checked} ></StdCheckBoxBall>
      </StdCheckBoxWrappper>
  );
};

const SimpleCheckBoxBase = styled.label<{checked:boolean}>`
    width: 85px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    position: relative;
    background: ${props => props.checked ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0)'};
    transition: .3s linear;
    & > input{
        display: none;
    }
`;

const SimpleTitle = styled.span`
  color: #fff;
  font-size: 13px;
  font-weight: 300;
  ${YAxe};
  left: 10px;
`;

export const SimpleCheckBox:FC<StdCheckProps> = ({ checked, func }) => {
  return (
      <SimpleCheckBoxBase checked={checked}>
          <input type='checkbox' checked={checked} onChange={(e) => func(e)} />
          <SimpleTitle>export</SimpleTitle>
      </SimpleCheckBoxBase>
  );
};
