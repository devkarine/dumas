import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const Action = styled.span`
  cursor: pointer;
  padding: 0 12px;
  ${media.tablet`
    padding: 0 8px;
  `};
`;

export const QuantityContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
