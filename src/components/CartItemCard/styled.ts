import styled from 'styled-components';
import { media } from '../../consts/mediaquery';
import { TabletBreakpoint } from '../../consts/breakpoint';

export const ItemContainer = styled.div`
  display: flex;
  padding: 12px 0;
  color: ${({ theme }) => theme.colors.text.main};
  justify-content: space-between;
  align-items: center;
  ${media.tablet`
    align-items: unset;
    
  `}
`;

export const CartActions = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;

  ${media.tablet`
  flex: unset;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  `}
`;

export const Price = styled.span``;

export const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  ${media.tablet`
    flex-direction: column;
    
  `}
`;
export const ItemImage = styled.img`
  width: 200px;
  border-radius: 12px;
  ${media.tablet`
  width: 120px;
  
  `}
`;
export const ItemInfo = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.tablet`
    gap: 4px;
  `}
`;
export const ItemActions = styled.div`
  width: 170px;
  height: 50px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.background.main};
  display: flex;
  align-items: center;
  padding: 0 12px;

  ${media.tablet`
  width: 80px;
  height: 30px;
  border-radius: 15px;
  padding: 0 4px;
  `}
`;

export const PriceContainer = styled.div``;
export const RemoveItemContainer = styled.div``;
export const Text = styled.span`
  font-size: ${({ theme }) => theme.fonts.text.medium};
  @media (max-width: ${TabletBreakpoint}) {
    font-size: ${({ theme }) => theme.fonts.text.small};
  }
`;

export const RemoveButton = styled.div`
  width: 32px;
  height: 32px;
  border: 2px solid ${({ theme }) => theme.colors.text.main};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
