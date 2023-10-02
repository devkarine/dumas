import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const FooterContainer = styled.footer`
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary.main};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  position: sticky;
  height: 58px;

  ${media.desktop`
    display: none;
  `}
`;

export const FooterOption = styled.div`
  font-size: ${({ theme }) => theme.fonts.text.small};
  padding: 8px;
  text-align: center;
  border-right: 1px solid ${({ theme }) => theme.colors.white};
  display: flex;
  flex: 1;
  justify-content: center;

  &:last-child {
    border: none;
  }
`;
