import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const MenuContainer = styled.div`
  position: absolute;
  width: 300px;
  top: 60px;
  z-index: 2;
  right: 0;
  color: ${({ theme }) => theme.colors.white};
  box-shadow: 2px inset;
  background-color: ${({ theme }) => theme.colors.background.dark};

  ${media.tablet`
  @keyframes slideRight {
    from {
      width: 0;
    }
    to {
      width: 30%;
    }
  }
    width: 30%;
    height: calc(100vh - 118px);
    flex: 1;
    top: 60px;
    left: 0;
    animation: slideRight 500ms
  `};
  ${media.mobile`
  @keyframes slideRight {
    from {
      width: 0;
    }
    to {
      width: 80%;
    }
  }
    width: 80%;
  `}
`;

export const MenuItem = styled.div`
  padding: 18px 28px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.background.dark};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};
  font-size: ${({ theme }) => theme.fonts.text.medium};
  z-index: 3;
  border-bottom: 2px solid ${({ theme }) => theme.colors.white};
  cursor: pointer;
  svg {
    margin-top: 4px;
  }
`;
