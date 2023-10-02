import styled from 'styled-components';

export const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding-bottom: 20px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 12px 12px;
  width: 261px;
  border: 1px solid ${({ theme }) => theme.colors.secondary.main};
`;

export const DishImage = styled.img`
  overflow: hidden;
  width: 259px;
  max-height: 130px;
  display: block;
  border-radius: 12px 12px 0 0;
`;

export const DishInfo = styled.div`
  text-align: center;
  margin-top: 10px;
`;

export const DishTitle = styled.span`
  padding-top: 10px;
  color: ${({ theme }) => theme.colors.text.main};
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.semiBold};

  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const DishPrice = styled.p`
  padding-top: 10px;
  font-size: ${({ theme }) => theme.fonts.text.small};
  color: ${({ theme }) => theme.colors.text.main};
`;
