import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  color: ${({ theme }) => theme.colors.text.main};
  flex: 1;
  padding: 18px 32px;
`;
export const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
`;
export const QrCodeContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  padding: 12px;
`;
export const PriceContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary.main};
  font-size: ${({ theme }) => theme.fonts.header.large};
  font-weight: ${({ theme }) => theme.fonts.weight.semiBold};
`;

export const NoAddress = styled.div`
  border: 2px solid ${({ theme }) => theme.colors.primary.main};
  display: flex;
  flex-direction: column;
  gap: 48px;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-top: 100px;
  padding: 48px 0;
  border-radius: 12px;
`;

export const NoAddressContainer = styled.div`
  display: flex;
  justify-content: center;
`;
