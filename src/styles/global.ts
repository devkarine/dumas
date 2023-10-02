import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    line-height: 1.5;
  }

  html, body {
    width: 100%;
    min-height: 100vh;
    font-size: 100%;
    font-family: ${({ theme }) => theme.fonts.family.primary};
    -webkit-font-smoothing: antialiased;
    background-color: ${({ theme }) => theme.colors.background.light};
  }

  button {
    cursor: pointer;
    border: none;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style-type: none;
  }

  ::-webkit-scrollbar {
width: 10px ;

  }

::-webkit-scrollbar-thumb {
  width: 10px ;
  background-color: ${({ theme }) => theme.colors.background.dark}; 
  border-radius: 6px;
} 
`;
