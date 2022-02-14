import styled from 'styled-components';

const CoverColor = '#272727';

export const MainContainer = {
  Container: styled.div`
    z-index: 1;
    position: relative;
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 40px minmax(300px,500px) 50px;
    grid-template-areas:
    "header"
    "main"
    "footer";
  `,
  HeaderCompo: styled.header`
    grid-area: header;
    background: ${CoverColor};
  `,
  MainCompo: styled.main`
    grid-area: main;
    overflow: scroll;
  `,
  FooterCompo: styled.footer`
    grid-area: footer;
    background: ${CoverColor};
  `
};

export const ImageContainer = {
  Container: styled.div<{switch:boolean}>`
      z-index: 5;
      position: absolute;
      top: 0;
      left: ${props => props.switch ? '0px' : '100%'};
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: 1fr;
      grid-template-rows: 40px minmax(300px,1fr) 40px;
      grid-template-areas:
      "header"
      "main"
      "footer";
      transition: .3s linear;
      background: rgba(0,0,0,0.5);
  `,
  HeaderCompo: styled.header`
    grid-area: header;
    background: ${CoverColor};
    display: flex;
    justify-content:space-between;
  `,
  MainCompo: styled.main`
    grid-area:main,
    overflow: scroll;
  `,
  FooterCompo: styled.footer`
    grid-area: footer;
    background: ${CoverColor};
  `
};

export const OptionsContainer = {
  CoverLayer: styled.div<{checked:boolean}>`
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    transition: .3s linear;
    opacity: ${props => props.checked ? 1 : 0};
    pointer-events: ${props => props.checked ? 'auto' : 'none'};
  `,
  Container: styled.div`
    width: 325px;
    height: 220px;
    border-radius: 5px;
    position: absolute;
    z-index: 15;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: #555;
    padding: 10px;
    box-sizing: border-box;
  `
};
