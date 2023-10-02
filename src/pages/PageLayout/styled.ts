import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100vh;
  ${media.tablet`
  gap:4px;
`}
`;
