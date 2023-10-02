import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

interface ContainerProps {
  variant: 'primary' | 'secondary';
}

export const Container = styled.span<ContainerProps>`
  padding: 10px 0;

  ${media.mobile`
  font-size: 14px;
  `}

  ${({ variant, theme }) => {
    if (variant === 'primary') {
      return `
        color: ${theme.colors.secondary.main};
        font-size: ${theme.fonts.text.medium};
        font-weight: ${theme.fonts.weight.bold};
      `;
    } else if (variant === 'secondary') {
      return `
        color: ${theme.colors.text.main};
        font-size: ${theme.fonts.text.small};
        font-weight: ${theme.fonts.weight.regular};
      `;
    } else {
      return `
        color: ${theme.colors.text.main};
        font-size: ${theme.fonts.text.small};
        font-weight: ${theme.fonts.weight.regular};
      `;
    }
  }}

  a {
    &:visited {
      color: ${({ variant, theme }) =>
        variant === 'primary'
          ? theme.colors.secondary.main
          : theme.colors.text.main};
    }
  }
`;
