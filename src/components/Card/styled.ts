import styled from 'styled-components';

export const CardContainer = styled.div`
  max-width: 300px;
  max-height: 200px;
  border-radius: 12px;
  position: relative;
`;

export const CardImage = styled.img`
  overflow: hidden;
  width: 300px;
  max-height: 130px;
  display: block;
  border-radius: 12px 12px 0 0;
`;

export const FavouriteIconContainer = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 12px;
  top: 4px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.secondary.main};
    position: absolute;
    margin-top: 3px;
    width: 20px;
    height: 30px;
  }
`;
export const IconButton = styled.button``;
export const DishContainer = styled.div`
  padding-top: 4px;
`;
export const TitleAndIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CartIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 8px;

  svg {
    width: 30px;
    height: 30px;
    color: ${({ theme }) => theme.colors.secondary.main};
  }
`;

export const PriceAndRatingContainer = styled.div`
  display: flex;
  flex: 4;
  justify-content: space-between;
`;

export const DistanceContainer = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-end;
`;
export const DishTitle = styled.span`
  color: ${({ theme }) => theme.colors.text.main};
  font-size: ${({ theme }) => theme.fonts.header.small};
  font-weight: ${({ theme }) => theme.fonts.weight.semiBold};
`;

export const DishInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DishInfo = styled.div`
  color: ${({ theme }) => theme.colors.text.main};
  font-weight: ${({ theme }) => theme.fonts.weight.regular};

  svg {
    color: ${({ theme }) => theme.colors.secondary.main};
    position: absolute;
    margin-top: 2px;
    margin-left: 4px;
  }
`;
