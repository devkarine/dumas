import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const Container = styled.div`
  padding: 0 32px;
  flex: 2;
  ${media.mobile`
    /* display: none; */
    /* max-height: 30%; */
  `}
`;

export const BannerImage = styled.img`
  width: 100%;
`;
