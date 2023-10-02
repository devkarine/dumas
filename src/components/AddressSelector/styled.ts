import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const SelectorContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.main};
  position: absolute;
  width: 400px;
  top: 60px;
  z-index: 2;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.tablet`
    position: fixed;
  `}
  ${media.mobile`
    width: 260px;
  `}
`;

export const AddressInfo = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;
