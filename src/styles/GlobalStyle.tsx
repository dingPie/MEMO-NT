import {createGlobalStyle} from 'styled-components';


const GlobalStyle= createGlobalStyle`
  * {
    box-sizing: border-box;
    
    
    /* font-family: "Neo둥근모Code"; */
  }
  body {
    margin: 0;
    height: 100vh;
    background: ${({theme}) => theme.colors.primary_blue};
  }
`

export default GlobalStyle;