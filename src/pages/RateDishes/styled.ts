import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  ${media.tablet`
    width: 60%;
    justify-content: center;
  `}
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  color: ${({ theme }) => theme.colors.text.main};
  flex: 1;
  padding: 18px 32px;
  align-items: center;
  justify-content: center;

  ${media.tablet`
    padding: 12px;
  `}
`;
