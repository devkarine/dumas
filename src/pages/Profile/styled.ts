import { styled } from 'styled-components';
import { TabletBreakpoint } from '../../consts/breakpoint';

export const Title3 = styled.h3`
  color: ${({ theme }) => theme.colors.secondary.main};
  top: -18px;
  position: absolute;
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.background.light};
  font-size: ${({ theme }) => theme.fonts.text.large};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

export const ContainerProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 49px;
  padding: 38px;
`;

export const WrapperModal = styled.div`
  color: ${({ theme }) => theme.colors.text.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px;
  border: 2px solid #8c0b0b;
  min-width: 100%;
  height: auto;
  padding: 50px 27px;
  position: relative;

  @media (max-width: ${TabletBreakpoint}) {
    flex-direction: column;
    align-items: center;
    padding: 50px 10px;
    gap: 25px;
  }
`;

export const UserInfoAndModalContainer = styled.div``;
export const UserInfoContainer = styled.div``;
export const UserInfo = styled.div``;
export const Strong = styled.strong``;
export const ButtonContainer = styled.strong``;
export const SpinnerContainer = styled.p``;

export const ContainerImg = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
export const DecorativeImage = styled.img``;
