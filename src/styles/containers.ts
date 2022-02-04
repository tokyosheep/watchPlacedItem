import styled from 'styled-components';

const CoverColor = '#272727';

export const MainContainer = {
  Container: styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 1fr;
    grid-template-rows: 40px minmax(300px,1fr) 50px;
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
  Container: styled.div`
      display: grid;
      width: 100%;
      height: 100%;
      grid-template-columns: 1fr;
      grid-template-rows: 40px minmax(300px,1fr) 40px;
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
    grid-area:main,
    overflow: scroll;
  `,
  FooterCompo: styled.footer`
    grid-area: footer;
    background: ${CoverColor};
  `
};
