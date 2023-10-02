import styled from 'styled-components';
import { TabletBreakpoint } from '../../consts/breakpoint';

interface MainTitleProps {
  color: 'default' | 'accent';
}
export const MainTitle = styled.h2<MainTitleProps>`
  color: ${({ theme, color }) =>
    color === 'default'
      ? theme.colors.text.secondaryAccent
      : theme.colors.secondary.main};
  font-size: ${({ theme }) => theme.fonts.header.medium};

  @media (max-width: ${TabletBreakpoint}) {
    font-size: ${({ theme }) => theme.fonts.header.small};
  }
`;
