import React, { FC } from 'react';
import styled from 'styled-components';

type PathBoxProps = {
    filePath:string
}

const BasePathBox = styled.div`
    width: 310px;
    height: 25px;
    background: #312F2F;
    border-radius: 3px;
    border: hidden;
    color: #fff;
    font-size: 13px;
    font-weight: 300;
    overflow:hidden;
    margin: 5px;
    white-space: nowrap;
`;

export const PathBox:FC<PathBoxProps> = ({ filePath }) => {
  return (
      <BasePathBox>
          {filePath}
      </BasePathBox>
  );
};

type ExportPathProps = {
    filePath:string,
    func:() => void,
    checked:boolean
};

const ExportFilePathBase = styled(BasePathBox)<{checked:boolean}>`
    border: 1px solid #000;
    transition: .3s linear;
    &:hover{
        background: rgba(255,255,255,0.1);
    }
    color: ${props => props.checked ? '#fff' : '222'};
    background: ${props => props.checked ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)'};
    color: ${props => props.checked ? '#fff' : '#888'};
    cursor:pointer;
`;

export const ExportPathBox:FC<ExportPathProps> = ({ filePath = 'export path', func, checked }) => {
  return (
      <ExportFilePathBase onClick={func} checked={checked} >
          {filePath}
      </ExportFilePathBase>
  );
};
