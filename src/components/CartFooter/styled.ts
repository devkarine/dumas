import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const FooterContainer = styled.footer`
  height: 50px;
  width: 100%;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary.main};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;

  ${media.desktop`
    display: none;
  `}
`;

export const DeliveryAddress = styled.span`
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.semiBold};
`;
export const FooterText = styled.span`
  font-size: ${({ theme }) => theme.fonts.text.small};
`;
