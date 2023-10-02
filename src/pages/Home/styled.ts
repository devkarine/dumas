import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const MainContainer = styled.div`
  padding: 12px 32px;
  max-width: 100%;
  display: flex;
  flex-direction: row;
  ${media.tablet`
    padding: 0;
    justify-content: center;
  `}
`;

export const FavoritesContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.background.main};
  border-radius: 12px;
  padding: 18px;
  transition: 500ms;
  min-width: 320px;

  ${media.tablet`
  
    padding: 0;
    background-color: inherit;
  `}
`;

export const DishListContainer = styled.div`
  ${media.tablet`
    padding: 0;
    background-color: inherit;
`}
`;

export const LeftContainer = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-right: 32px;

  ${media.tablet`
    padding: 0 18px;
    justify-content: center;
  `}
`;

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

interface SeeMoreToggleProps {
  $accent?: boolean;
}

export const SeeMoreToggle = styled.span<SeeMoreToggleProps>`
  cursor: pointer;
  color: ${({ theme, $accent }) =>
    $accent ? theme.colors.text.secondaryAccent : theme.colors.secondary.main};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  font-size: ${({ theme }) => theme.fonts.text.medium};
`;

export const DishesContainer = styled.div`
  flex: 4;
  overflow-y: auto;
`;
