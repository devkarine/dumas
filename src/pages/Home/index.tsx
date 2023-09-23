import { NearDishesMap } from '../../components/NearDishesMap';
import { Dish } from '../../types/Dish';
import {
  getAllDishes,
  getFavouriteDishes,
  getNearDishes
} from '../../service/api/dishes';
import { useEffect, useState } from 'react';
import CardList from '../../components/CardList';
import { FavoritesContainer, LeftContainer, MainContainer } from './styled';
import { Title } from '../../components/Title';
import { InfoText } from '../../components/InfoText';
import { Chef } from '../../types/Chef';
import { getAllChefs } from '../../service/api/chefs';

export const Home = () => {
  const [nearDishes, setNearDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [favouriteDishes, setFavouriteDishes] = useState<Dish[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);

  useEffect(() => {
    const getData = async () => {
      const favouriteDishesData = await getFavouriteDishes();
      setFavouriteDishes(favouriteDishesData.data);
      const nearDishesData = await getNearDishes({
        latitude: -3.73883335224498,
        longitude: -3.85402670488225e15
      });
      setNearDishes(nearDishesData.data);

      const allDishesData = await getAllDishes();
      console.log(allDishesData);
      setAllDishes(allDishesData.data);

      const chefsData = await getAllChefs();
      setChefs(chefsData.data);
    };

    getData();
  }, []);
  return (
    <>
      <NearDishesMap chefs={chefs} />
      <MainContainer>
        <LeftContainer>
          <Title color="accent">Pratos próximos</Title>
          {nearDishes.length ? (
            <CardList dishes={nearDishes} direction="row" />
          ) : (
            <InfoText> Não existem pratos próximos</InfoText>
          )}
          <Title color="accent">Pratos</Title>
          <CardList dishes={allDishes} direction="row" />
        </LeftContainer>
        <FavoritesContainer>
          <Title>Favoritos</Title>
          {favouriteDishes.length ? (
            <CardList dishes={favouriteDishes} direction="column" />
          ) : (
            <InfoText> Adicione pratos à sua lista de favoritos</InfoText>
          )}
        </FavoritesContainer>
      </MainContainer>
    </>
  );
};