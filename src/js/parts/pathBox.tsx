import React, { FC } from 'react';
import styled from 'styled-components';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { enterArea, leaveArea, setPosition } from '../redux/features/floatBox/floatBoxSlice';
import { useAppDispatch } from '../redux/app/hooks';

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
    display: flex;
    align-items:center;
`;

export const PathBox:FC<PathBoxProps> = ({ filePath }) => {
  const dispatch = useAppDispatch();
  return (
      <BasePathBox
        onMouseEnter={(e) => {
          dispatch(enterArea({
            msg: filePath,
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
          {filePath}
      </BasePathBox>
  );
};

type ExportPathProps = {
    filePath:string,
    func:() => void,
    checked:boolean,
    onDrop:(monitor:DropTargetMonitor) => void
};

const ExportFilePathBase = styled(BasePathBox)<{checked:boolean, color:string}>`
    border: 1px solid #000;
    transition: .3s linear;
    &:hover{
        background: ${props => props.checked ? props.color : 'rgba(255,255,255,0)'};
    }
    color: ${props => props.checked ? '#fff' : '222'};
    background: ${props => props.checked ? props.color : 'rgba(0,0,0,0)'};
    color: ${props => props.checked ? '#fff' : '#888'};
    display: flex;
    align-items: center;
    padding-left: 5px;
    box-sizing: border-box;
    cursor:pointer;
`;

export const ExportPathBox:FC<ExportPathProps> = ({ filePath = 'export path', func, checked, onDrop }) => {
  const dispatch = useAppDispatch();
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: [NativeTypes.FILE],
    drop (item, monitor) {
      if (onDrop) {
        onDrop(monitor);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const color = canDrop && isOver ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.3)';
  return (
        <ExportFilePathBase
          ref={drop}
          color={color}
          onClick={func}
          checked={checked}
          onMouseEnter={(e) => {
            dispatch(enterArea({
              msg: filePath,
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
            {filePath}
        </ExportFilePathBase>
  );
};
