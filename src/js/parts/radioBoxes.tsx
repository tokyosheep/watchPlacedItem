import React, { FC, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';

const StdRadioWrapper = styled.label`
    width: 55px;
    height: 20px;
    border-radius: 3px;
    display: flex;
    justify-content: space-around;
    border: 1px solid #999;
    align-items: center;
    & > input{
        display: none;
    }
`;

const StdRadioTitle = styled.span`
    font-size: 13px;
    font-weight: 300;
    color: #fff;
`;

const StdRadioHole = styled.div<{darkGray:string, checked:boolean, green:string}>`
    width: 13px;
    height: 13px;
    background: ${props => props.darkGray};
    border-radius: 50%;
    position: relative;
    & > div{
        width: 10px;
        height: 10px;
        scale: ${props => props.checked ? 1 : 0};
        background: ${props => props.green};
        border-radius: 50%;
        transition: .3s linear;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: ${props => props.checked ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0)'};
    }
`;

export type StdRadioProps = {
    checked:boolean,
    func: (name:string) => void,
    name:string
}

export const StdRadioBox:FC<StdRadioProps> = ({ checked, func, name }) => {
  const theme = useContext(ThemeContext);
  return (
      <StdRadioWrapper>
          <input type='radio' checked={checked} onChange={() => func(name)} />
          <StdRadioTitle>{name}</StdRadioTitle>
          <StdRadioHole checked={checked} green={theme.green} darkGray={theme.darkGray}>
              <div></div>
          </StdRadioHole>
      </StdRadioWrapper>
  );
};
