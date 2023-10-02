import { DefaultTheme } from 'styled-components';

export const light: DefaultTheme = {
  colors: {
    background: {
      dark: '#FF5600',
      main: '#FFEDE4',
      light: '#FDFDFD'
    },
    backgroundMainLayout: {
      main: '#FFEDE4'
    },
    primary: {
      main: '#FF5600',
      dark: '#D95829'
    },
    secondary: {
      main: '#8C0B0B',
      light: '#CA1E1E'
    },
    black: '#333333',
    white: '#FEFEFE',
    button: {
      disabled: '#6f6464'
    },

    text: {
      main: '#333333',
      primaryAccent: '#FF5600',
      secondaryAccent: '#8C0B0B',
      light: '#ffffff'
    },
    error: {
      main: '#FF0000'
    },
    border: {
      main: '#FF5600'
    }
  },
  fonts: {
    family: {
      primary: 'Poppins'
    },
    text: {
      errorSize: '10px',
      extraSmall: '12px',
      small: '14px',
      medium: '18px',
      large: '18px'
    },
    header: {
      small: '22px',
      medium: '24px',
      large: '28px'
    },

    weight: {
      light: 400,
      regular: 500,
      semiBold: 600,
      bold: 700
    }
  },
  logoSrc: 'ImagesMainLayout/light/logo.png',
  centeredImageSrc: 'ImagesMainLayout/light/eating a variety of foods-bro.svg',
  iconColor: '#000'
};

export const dark: DefaultTheme = {
  ...light,
  colors: {
    ...light.colors,
    background: {
      dark: '#8C0B0B',
      main: '#8C0B0B',
      light: '#262626'
    },
    backgroundMainLayout: {
      main: '#D45513'
    },
    black: '#333333',
    white: '#EEEEEE',
    secondary: {
      main: '#D45513'
    },
    text: {
      main: '#FDFDFD',
      primaryAccent: '#FFF',
      secondaryAccent: '#FFF'
    },
    border: {
      main: '#FFF'
    }
  },
  logoSrc: 'ImagesMainLayout/dark/logo.png',
  centeredImageSrc: 'ImagesMainLayout/dark/eating a variety of foods-bro.svg',
  iconColor: '#fff'
};
