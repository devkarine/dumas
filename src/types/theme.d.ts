import 'styled-components';
type ColorPalette = {
  main: string;
  light?: string;
  dark?: string;
  primaryAccent?: string;
  secondaryAccent?: string;
};
type FontSize = {
  errorSize?: string;
  extraSmall?: string;
  small: string;
  medium: string;
  large: string;
  extraLarge?: string;
};
type FontWeight = {
  light: number;
  regular: number;
  semiBold: number;
  bold: number;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: ColorPalette;
      secondary: ColorPalette;
      error: ColorPalette;
      warning?: ColorPalette;
      info?: ColorPalette;
      success?: ColorPalette;
      background: ColorPalette;
      backgroundMainLayout: ColorPalette;
      text: ColorPalette;
      white: string;
      black: string;
      border: ColorPalette;
      button: {
        disabled: string;
      };
    };
    fonts: {
      family: {
        primary: string;
        secondary?: string;
      };
      text: FontSize;
      header: FontSize;
      weight: FontWeight;
    };
  }
}
