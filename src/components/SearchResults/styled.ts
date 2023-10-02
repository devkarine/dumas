import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const ResultsContainer = styled.div`
  position: absolute;
  top: 72px;
  width: 800px;
  max-height: 410px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  z-index: 10;

  ${media.tablet`
    width: 98%;
    max-height: 460px;
    left:0;
  `}
`;

export const Result = styled.div`
  background-color: ${({ theme }) => theme.colors.background.light};
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.text.secondaryAccent};
`;
export const InfoContainer = styled.div`
  height: 100px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px;
  ${media.tablet`
    height: 120px;
  `};
`;
export const DishName = styled.span`
  color: ${({ theme }) => theme.colors.text.secondaryAccent};
  font-size: ${({ theme }) => theme.fonts.text.medium};
`;
export const DishDescription = styled.span`
  color: ${({ theme }) => theme.colors.text.main};
  font-size: ${({ theme }) => theme.fonts.text.extraSmall};
`;
export const DishImage = styled.img`
  width: 120px;
  height: 120px;
  margin: 10px 4px;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.secondary.main};
  padding: 8px 0;
`;
