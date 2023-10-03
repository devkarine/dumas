import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

interface ListProps {
  direction: 'row' | 'column';
  $fullWidth: boolean;
}

export const List = styled.div<ListProps>`
  display: flex;
  justify-content: baseline;
  flex-wrap: wrap;
  overflow: hidden;
  min-height: 180px;
  max-height: 400px;
  gap: 28px;
  padding: 8px;

  ${({ direction, $fullWidth }) => `
  flex-direction: ${direction};
    ${
      $fullWidth
        ? `widht: 100%;
          overflow-y: auto;
      `
        : direction === 'row'
        ? `max-height: 200px;`
        : `max-width: 300px; max-height: 430px`
    }
  `};

  ${media.tablet`
    width: auto;
    align-items: center;
    justify-content: center;
  `}
`;
