import { styled } from 'styled-components';
import { media } from '../../consts/mediaquery';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;

  ${media.mobile`
    flex-direction: column;
    width: 100%;
  `}

  ${media.tablet`
    flex-direction: column;
    width: 100%;
  `}
`;

export const MainLayoutContainer = styled.div`
  display: flex;
  width: 100%;

  ${media.mobile`
    flex-direction: column;
    width: 100%;
    align-items: center; 
    justify-content: center; 
  `}

  ${media.tablet`
    flex-direction: column;
    width: 100%;
    align-items: center; 
    justify-content: center;
  `}

  ${media.desktop`
    flex: 1; 
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const HalfScreen = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundMainLayout.main};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
  width: 100%;
  height: 100%;

  ${media.desktop`
    flex: 1; 
    min-height: 10vh;
  `}
`;

export const Logo = styled.img`
  width: 95px;
`;

export const CenteredImage = styled.img`
  padding-top: 180px;
  width: 65%;
  margin: auto;

  ${media.tablet`
    display: none;
  `}
`;

export const RightContent = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background.light};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
