import { styled } from 'styled-components';

export const ContainerAddressProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const WrapperEditDelete = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  font-size: 25px;
  color: ${({ theme }) => theme.colors.secondary.main};
`;

export const InputAddress = styled.input`
  margin-left: 10px;
  padding: 3px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.colors.border.main};
  border-radius: 5px;

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
