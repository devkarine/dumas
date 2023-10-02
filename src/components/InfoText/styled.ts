import styled from 'styled-components';

export const Text = styled.h2`
  color: ${({ theme }) => theme.colors.text.main};
  font-size: ${({ theme }) => theme.fonts.text.large};
`;
