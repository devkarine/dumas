import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
  line-height: 1.5;
}

html, body, #root {
  width: 100%;
  min-height: 100vh;
  font-size: 100%;
  // font-family: ${({theme}) => theme.}
  -webkit-font-smoothing: antialiased;

  button {
    cursor: pointer;
    background: none;
    border: none;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style-type: none;
  }
}

`;
