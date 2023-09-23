import { css } from 'styled-components';
import { MobileBreakpoint, TabletBreakpoint } from './breakpoint';

export const media = {
  mobile: (styles: TemplateStringsArray) => css`
    @media (max-width: ${MobileBreakpoint}) {
      ${styles}
    }
  `,
  tablet: (styles: TemplateStringsArray) => css`
    @media (max-width: ${TabletBreakpoint}) {
      ${styles}
    }
  `,
  desktop: (styles: TemplateStringsArray) => css`
    @media (min-width: ${TabletBreakpoint}) {
      ${styles}
    }
  `
};
