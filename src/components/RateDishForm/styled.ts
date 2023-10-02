import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const RateDishContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  gap: 12px;
  width: 60%;

  ${media.tablet`
    padding: 12px;  
    width: 100%;
  `}
  ${media.mobile`
    flex-direction: column;
    width: 100%;
    align-items: center;
    padding: 12px;  
  `}
`;

export const DishInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
`;
export const RatingInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const TitleComment = styled.h4`
  text-align: center;
`;
export const RatingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex: 2;
`;
export const DishImage = styled.img`
  width: 180px;
  border-radius: 12px;
`;

export const StarsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 0 24px;
  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    width: 28px;
    height: 28px;
  }
`;
export const Star = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const RatingCommentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 24px;
`;
export const RatingComment = styled.textarea`
  min-width: 310px;
  max-width: 100%;
  height: 140px;
  padding: 4px;

  ${media.mobile`
  width: 100%;
  min-width: 250px;
  `}
`;
