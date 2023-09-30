import { useEffect, useState } from 'react';
import {
  Container,
  TopContainer,
  IntermediateContainer,
  LeftContainer,
  RightContainer,
  ButtonContainer,
  MapContainer,
  DistanceDetails,
  ProductImage,
  Text,
  TextContainer,
  QuantityPrice
} from './styled';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { Dish } from '../../types/Dish';
import { formatCurrency } from '../../utils/formatCurrency';
import { getDishId } from '../../service/api/dishes';
import { useParams } from 'react-router-dom';

export const ProductDetails = () => {
  const [dishDetail, setDishDetail] = useState<Dish>();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const dishDetailData = await getDishId(id);
        setDishDetail(dishDetailData);
      }
    };
    getData();
  }, []);

  return (
    <Container>
      <TopContainer>
        <Title color="accent">{dishDetail?.name}</Title>
      </TopContainer>

      <IntermediateContainer>
        <LeftContainer>
          <ProductImage src={dishDetail?.images[0]} alt="Imagem do produto" />

          <TextContainer>
            <Text>
              <strong>Chefe:</strong> {dishDetail?.chef.name}
            </Text>
            <Text>{dishDetail?.available}</Text>
            <Text>
              <strong>Descrição:</strong> {dishDetail?.description}
            </Text>
          </TextContainer>
        </LeftContainer>

        <RightContainer>
          <MapContainer></MapContainer>
          <DistanceDetails>
            <Title color="accent">{dishDetail?.distance}</Title>
          </DistanceDetails>
          <QuantityPrice>
            <Button variant="primary" size="medium">
              1
            </Button>
            <Title color="accent">
              {formatCurrency(dishDetail?.unit_price)} {}
            </Title>
          </QuantityPrice>

          <ButtonContainer>
            <Button variant="primary" size="medium">
              Comprar
            </Button>
          </ButtonContainer>
        </RightContainer>
      </IntermediateContainer>
    </Container>
  );
};
