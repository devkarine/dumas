import { styled } from 'styled-components';
import { TabletBreakpoint } from '../../consts/breakpoint';

interface ButtonContainerProps {
  $variant: 'primary' | 'secondary';
  size: 'medium' | 'large';
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  border-radius: 30px;
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.text.small};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ size }) => (size === 'medium' ? '12px 26px' : '18px 26px')};
  width: ${({ size }) => (size === 'medium' ? '150px' : '380px')};
  transition: 0.3s ease-in-out;

  ${({ $variant, theme }) =>
    $variant === 'primary'
      ? `
        background:${theme.colors.secondary.main};
      `
      : `
        background:${theme.colors.primary.main};
      `}

  &:hover {
    opacity: 0.7;
  }
  &:disabled {
    background: ${({ theme }) => theme.colors.button.disabled};
  }

  @media (max-width: ${TabletBreakpoint}) {
    width: ${({ size }) => (size === 'medium' ? '138px' : '249px')};
    padding: 12px 26px;
  }
`;
