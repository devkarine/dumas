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
  QuantityPrice,
  ChefContainer,
  ChefAvaliation,
  CounterContainer,
  CountButton,
  CountDisplay,
  AddButton,
  FavouriteIconContainer,
  ImageAndLike,
  ContainerChefsDishes,
  ContainerCards,
  Coments,
  ContainerComents
} from './styled';
import { BsFillStarFill } from 'react-icons/bs';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { DishCard } from '../../components/DishCard';
import { Dish } from '../../types/Dish';
import { formatCurrency } from '../../utils/formatCurrency';
import { getDishId, getDishesPerChef } from '../../service/api/dishes';
import { useParams } from 'react-router-dom';
import { NearDishesMap } from '../../components/NearDishesMap';
import { getChef } from '../../service/api/chefs';
import { Chef } from '../../types/Chef';
import { useAuth } from '../../contexts/authContext';
import { useCart } from '../../contexts/cartContex';
import { toast } from 'react-toastify';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { dislikeDish, likeDish } from '../../service/api/dishes';
import queryClient from '../../service/reactQuery/queryClient';
import { Rating } from '../../types/Rating';

export const ProductDetails = () => {
  const [dishDetail, setDishDetail] = useState<Dish>();
  const [distance, setDistance] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [chef, setChef] = useState<Chef[]>([]);
  const [chefDishes, setChefDishes] = useState<Dish[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const { id } = useParams();
  const { userLocation } = useAuth();
  const { addToCart } = useCart();
  const [liked, setLiked] = useState(dishDetail?.liked_by_me || false);

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const dishDetailData = await getDishId(id);
        setDishDetail(dishDetailData);
        setLiked(dishDetailData?.liked_by_me || false);
        setRatings(dishDetailData?.ratings);
      }
    };
    getData();
  }, [id]);

  useEffect(() => {
    const getData = async () => {
      if (dishDetail) {
        const chefData = await getChef(dishDetail.chef_id);
        setChef([chefData]);
        const dishesData = await getDishesPerChef(dishDetail.chef_id);
        setChefDishes(dishesData.data);
      }
    };
    getData();
  }, [dishDetail]);

  useEffect(() => {
    if (
      chef.length > 0 &&
      chef[0].address.latitude &&
      chef[0].address.longitude
    ) {
      const response = google.maps.geometry.spherical.computeDistanceBetween(
        userLocation,
        { lat: chef[0].address.latitude, lng: chef[0].address.longitude }
      );
      setDistance(response / 1000);
    }
  }, [chef]);

  const rating =
    dishDetail && dishDetail.ratings.length > 0
      ? dishDetail.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
        dishDetail.ratings.length
      : 0;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  useEffect(() => {
    if (dishDetail && quantity >= 0) {
      const itemPrice = dishDetail.unit_price || 0;
      const calculatedTotalPrice = itemPrice * quantity;
      setTotalPrice(calculatedTotalPrice);
    }
  }, [quantity, dishDetail]);

  const toogleLiked = async (dish: Dish) => {
    if (dish.liked_by_me) {
      await dislikeDish(dish.id!);
    } else {
      await likeDish(dish.id!);
    }
    setLiked(prev => !prev);
    queryClient.invalidateQueries({ queryKey: ['favoriteDishes'] });
  };

  return (
    <>
      <Container>
        <TopContainer>
          <Title color="accent">{dishDetail?.name}</Title>
        </TopContainer>

        <IntermediateContainer>
          <LeftContainer>
            <ImageAndLike>
              <FavouriteIconContainer
                onClick={() => dishDetail && toogleLiked(dishDetail)}
              >
                {liked ? <BsHeartFill /> : <BsHeart />}
              </FavouriteIconContainer>
              <ProductImage
                src={dishDetail?.images[0]}
                alt="Imagem do produto"
              />
            </ImageAndLike>
            <TextContainer>
              <ChefContainer>
                <Text>
                  <strong>Chefe:</strong> {dishDetail?.chef.name}
                </Text>
                <ChefAvaliation>
                  {rating.toFixed(0)}
                  <BsFillStarFill />
                </ChefAvaliation>
              </ChefContainer>
              <Text>
                <strong>Descrição:</strong> {dishDetail?.description}
              </Text>
            </TextContainer>
          </LeftContainer>
          <RightContainer>
            <MapContainer>
              <NearDishesMap chefs={chef} />
            </MapContainer>
            <DistanceDetails>
              <Text>{distance.toFixed(1)} Km</Text>
            </DistanceDetails>
            <QuantityPrice>
              <CounterContainer>
                <CountButton onClick={decreaseQuantity}>-</CountButton>
                <CountDisplay>{quantity}</CountDisplay>
                <AddButton onClick={increaseQuantity}>+</AddButton>
              </CounterContainer>
              <Title color="accent">{formatCurrency(totalPrice)}</Title>
            </QuantityPrice>
            <ButtonContainer>
              <Button
                variant="primary"
                size="medium"
                disabled={quantity === 0}
                onClick={() => {
                  if (dishDetail) {
                    addToCart(dishDetail, quantity);
                    toast.success('Item adicionado');
                  }
                }}
              >
                Comprar
              </Button>
            </ButtonContainer>
          </RightContainer>
        </IntermediateContainer>
      </Container>

      <ContainerComents>
        <Title>Avaliações: </Title>
      </ContainerComents>
      {ratings.length === 0 ? (
        <Coments>
          <Text>Não há comentários</Text>
        </Coments>
      ) : (
        ratings.map((rating, index) => (
          <Coments key={index}>
            <Text>
              <strong>{rating.user_name}:</strong> {rating.comment}
            </Text>

            <ChefAvaliation>
              {rating.rate} <BsFillStarFill />
            </ChefAvaliation>
          </Coments>
        ))
      )}

      <ContainerChefsDishes>
        <Title>Outros pratos do mesmo chef</Title>
      </ContainerChefsDishes>
      <ContainerCards>
        {chefDishes
          .filter(chefDish => chefDish.id !== dishDetail?.id)
          .map((chefDish, index) => (
            <DishCard key={index} chefDish={chefDish} />
          ))}
      </ContainerCards>
    </>
  );
};
