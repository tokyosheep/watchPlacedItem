import React, { useCallback, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { SendHostScript } from '../../fileSystem/connectHostScript';
import { useAppDispatch, useAppSelector } from '../../redux/app/hooks';
import { closeWindow } from '../../redux/features/windowMode/windowSlice';
import { PDFvers, setBoolean, setPdf } from '../../redux/features/options/optionSlice';
import { StdCheckBox } from '../../parts/checkBoxes';
import { SwitchButton, StdButton } from '../../parts/buttons';
import { PDFSelector } from './PDFselector';

const MainWrapper = styled.main`

`;

const CheckedWrapper = styled.div`
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 10px 0px;
`;

const CheckTitle = styled.span`
    display: block;
    color: #fff;
    font-size: 15px;
    font-weight: 300;
    margin-left: 10px;
`;

const OptionsMain = () => {
  const theme = useContext(ThemeContext);
  const dispatch = useAppDispatch();
  const options = useAppSelector(state => state.options.value);
  const handleCheckCheck = prop => useCallback((e) => {
    dispatch(setBoolean({ prop, checked: e.target.checked }));
  }, [options]);
  console.log(PDFvers);
  const addTimeStampe = async () => {
    const connect = new SendHostScript('timeStamp.jsx');
    const r = await connect.callJsx();
    console.log(r);
  }
  return (
      <MainWrapper>
          <StdButton width={120} color={theme.darkGray} name='add time' func={addTimeStampe} />
        <CheckedWrapper>
            <StdCheckBox checked={options.isClose} func={handleCheckCheck('isClose')}/>
            <CheckTitle>close</CheckTitle>
        </CheckedWrapper>
        <CheckedWrapper>
            <StdCheckBox checked={options.timeStamp} func={handleCheckCheck('timeStamp')}/>
            <CheckTitle>time stamp</CheckTitle>
        </CheckedWrapper>
        <PDFSelector value={options.pdfver} options={PDFvers} func={(e) => {
          const ver:any = e.target.value;
          dispatch(setPdf(ver));
        }} />
        <SwitchButton name='back' func={() => dispatch(closeWindow('options'))} />
      </MainWrapper>
  )
};

export default OptionsMain;
