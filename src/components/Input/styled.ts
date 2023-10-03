import { styled } from 'styled-components';
import { TabletBreakpoint } from '../../consts/breakpoint';

export interface InputContainerProps {
  size: 'medium' | 'large';
}

export const Container = styled.div<InputContainerProps>`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 30px;
  padding: 18px 26px;
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  display: flex;
  gap: 8px;
  width: 380px;

  input,
  select {
    border: none;
    flex: 1;
    color: ${({ theme }) => theme.colors.text.main};
    background-color: transparent;

    &:focus {
      outline: none;
    }

    &:placeholder-shown {
      opacity: 0.3;
      background-color: transparent;
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.text.main};
    opacity: 0.3;
  }

  @media (max-width: ${TabletBreakpoint}) {
    width: ${({ size }) => (size === 'medium' ? '138px' : '249px')};
    padding: 12px 26px;
  }
`;
