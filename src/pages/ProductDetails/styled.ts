import styled from 'styled-components';
import { media } from '../../consts/mediaquery';

export const Container = styled.div`
  padding: 30px 72px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${media.mobile`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  `}

  ${media.tablet`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const TopContainer = styled.div`
  text-align: right;

  ${media.mobile`
    width: 80%;
    height: auto;
  `}

  ${media.tablet`
    width: 80%;
    height: auto;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const IntermediateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  flex-wrap: wrap;

  ${media.mobile`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  `}

  ${media.tablet`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const LeftContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  text-align: left;

  ${media.mobile`
    display: flex;
    flex-direction: column;
    align-items: center; 
    justify-content: center;
  `}

  ${media.tablet`
    display: flex;
    flex-direction: center;
    align-items: center; 
    justify-content: center;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const TextContainer = styled.div`
  width: 550px;
  height: auto;
  padding-top: 4%;

  ${media.mobile`
    width: 80%;
    height: auto;
  `}

  ${media.tablet`
    width: 80%;
    height: auto;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const Text = styled.h2`
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  padding-bottom: 3%;
  color: ${({ theme }) => theme.colors.text.main};
`;

export const RightContainer = styled.div`
  float: right;

  ${media.mobile`
    width: 80%;
    padding-top: 4%;
  `}

  ${media.tablet`
    width: 80%;
    padding-top: 4%;
  `}
`;

export const MapContainer = styled.div`
  width: 550px;
  height: 300px;
  border: 2px solid ${({ theme }) => theme.colors.secondary.main};
  border-radius: 12px;
  box-sizing: border-box;
  display: flex;
  padding: 12px 0;

  ${media.mobile`
    width: 100%;
  `}

  ${media.tablet`
    width: 100%;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const QuantityPrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
  padding-top: 4%;
`;

export const DistanceDetails = styled.div`
  padding: 10px;
  text-align: right;
`;

export const ButtonContainer = styled.div`
  text-align: right;
  padding-top: 4%;
`;

export const ProductImage = styled.img`
  border-radius: 12px;
  width: 550px;
  height: 300px;

  /* overflow: hidden; */

  ${media.mobile`
    width: 80%;
    height: auto;
  `}

  ${media.tablet`
    width: 80%;
    height: auto;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const ChefContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${media.mobile`
    width: 100%;
  `}

  ${media.tablet`
    width: 100%;
  `}

  ${media.desktop`
    flex: 1; 
  `}
`;

export const ChefAvaliation = styled.div`
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.text.main};
  display: flex;
  justify-content: space-between;

  svg {
    color: ${({ theme }) => theme.colors.primary.main};
    margin-top: 2px;
    margin-left: 4px;
  }
`;

export const CounterContainer = styled.div`
  border-radius: 38px;
  border: 1px solid ${({ theme }) => theme.colors.primary.main};
`;

export const CountButton = styled.button`
  border-top-left-radius: 38px;
  border-bottom-left-radius: 38px;
  margin-right: 0;
  padding: 5px 10px;
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.text.main};
  font-size: 16px;
  cursor: pointer;
`;

export const CountDisplay = styled.span`
  font-size: 16px;
  padding: 10px;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.text.small};
  font-weight: ${({ theme }) => theme.fonts.weight.light};
  color: ${({ theme }) => theme.colors.text.main};
`;

export const AddButton = styled.button`
  border-top-right-radius: 38px;
  border-bottom-right-radius: 38px;
  margin-left: 0;
  padding: 5px 10px;
  background: ${({ theme }) => theme.colors.background.main};
  color: ${({ theme }) => theme.colors.text.main};
  font-size: 16px;
  cursor: pointer;
`;

export const ImageAndLike = styled.button`
  position: relative;
  display: inline-block;
  background-color: transparent;

  ${media.mobile`
    width: 80%;
    height: auto;
  `}

  ${media.tablet`
     width: 80%;
     height: auto;
  `}

  ${media.desktop`
    flex: 1; 
 `}
`;

export const FavouriteIconContainer = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 2%;
  top: 2%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    color: ${({ theme }) => theme.colors.secondary.main};
    position: absolute;
    width: 20px;
    height: 30px;
  }

  ${media.mobile`
    right: 14%;
    top: 2%;
  `}

  ${media.tablet`
    right: 14%;
    top: 2%;
  `}

  ${media.desktop`
    flex: 1; 
 `}
`;
export const ContainerChefsDishes = styled.div`
  padding: 30px 72px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const ContainerComents = styled.div`
  padding: 30px 72px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const ContainerCards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

export const Coments = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 72px;
  gap: 20px;
`;

export const ComentsCard = styled.div`
  display: flex;
`;
