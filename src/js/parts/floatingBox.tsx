import React, { FC } from 'react';
import styled from 'styled-components';
import { FloatBoxProp } from '../redux/features/floatBox/floatBoxSlice';

const FloatBase = styled.div<{x:number, y:number, visible:boolean}>`
    width: 300px;
    height: 40px;
    color: #000;
    font-size: 11px;
    font-weight: 200;
    overflow: hidden;
    display: ${props => props.visible ? 'block' : 'none'};
    position: fixed;
    top: ${props => props.y - 50}px;
    left:${props => props.x - 30}px;
    z-index: 15;
    border: 1px solid #000;
    border-radius: 3px;
    background: #f3baa1cc;
    padding: 3px;
    box-sizing:border;
`;

const FloatBox:FC<FloatBoxProp> = ({ msg, visible, x, y }) => {
  return (
    <FloatBase visible={ msg !== '' && visible} x={x} y={y}>
      {msg}
    </FloatBase>
  )
}

export default FloatBox;
