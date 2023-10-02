import { styled } from 'styled-components';
import { TabletBreakpoint } from '../../consts/breakpoint';
import { InputContainerProps } from '../Input/styled';

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: auto;
  gap: 20px;
`;

export const ContainerTitleClose = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const ButtonClose = styled.span`
  font-size: 25px;
  color: ${({ theme }) => theme.colors.secondary.main};
  cursor: pointer;
`;

export const ContainerInput = styled.div<InputContainerProps>`
  background-color: ${({ theme }) => theme.colors.background.light};
  border-radius: 30px;
  padding: 18px 26px;
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  border: 1px solid ${({ theme }) => theme.colors.white};
  display: flex;
  gap: 8px;
  width: 380px;

  svg {
    color: ${({ theme }) => theme.colors.text.main};
    opacity: 0.3;
  }

  @media (max-width: ${TabletBreakpoint}) {
    width: ${({ size }) => (size === 'medium' ? '138px' : '249px')};
    padding: 12px 26px;
  }
`;

export const InputModal = styled.input`
  border: none;
  flex: 1;
  color: ${({ theme }) => theme.colors.text.main};
  background-color: transparent;

  &:focus {
    outline: none;
  }

  &:placeholder-shown {
    opacity: 0.3;
    background-color: transparent;
  }
`;

export const TitleModal = styled.h2`
  font-size: ${({ theme }) => theme.fonts.header.medium};
  font-weight: ${({ theme }) => theme.fonts.weight.semiBold};
  color: ${({ theme }) => theme.colors.secondary.main};
`;
