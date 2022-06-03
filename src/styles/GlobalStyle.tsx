import {createGlobalStyle} from 'styled-components';


const GlobalStyle= createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: "Neo둥근모Code";
  }
  html {
    height: 100%;
  }

  body {
    margin: 0 auto;
    height: 100%;
    background: ${({theme}) => theme.colors.light_gray};
  }
`

export default GlobalStyle;