import { NearDishesMap } from '../../components/NearDishesMap';
import { Dish } from '../../types/Dish';
import {
  getAllDishes,
  getFavouriteDishes,
  getNearDishes
} from '../../service/api/dishes';
import { useEffect, useRef, useState } from 'react';
import CardList from '../../components/CardList';
import {
  DishListContainer,
  DishesContainer,
  FavoritesContainer,
  LeftContainer,
  MainContainer,
  SeeMoreToggle,
  TitleContainer
} from './styled';
import { Title } from '../../components/Title';
import { InfoText } from '../../components/InfoText';
import { Chef } from '../../types/Chef';
import { useInfiniteQuery } from 'react-query';
import { getAllChefs } from '../../service/api/chefs';
import { useAuth } from '../../contexts/authContext';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { TabletBreakpoint } from '../../consts/breakpoint';
import { MobileFooter } from '../../components/MobileFooter';

export type DisplayingOptions = 'default' | 'favorites' | 'near' | 'all';

// const insertDistances = (
//   dishes: Dish[],
//   center: { lat: number; lng: number }
// ) => {
//   return dishes.map(dish =>
//     dish.chef.address &&
//     dish.chef.address.latitude &&
//     dish.chef.address.longitude
//       ? {
//           ...dish,
//           distance: google.maps.geometry.spherical.computeDistanceBetween(
//             center,
//             {
//               lat: dish.chef.address.latitude,
//               lng: dish.chef.address.longitude
//             }
//           )
//         }
//       : dish
//   );
// };

export const Home = () => {
  const [nearDishes, setNearDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [favouriteDishes, setFavouriteDishes] = useState<Dish[]>([]);
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [displaying, setDisplaying] = useState<DisplayingOptions>('default');

  const isTablet = useMediaQuery(`(max-width: ${TabletBreakpoint})`);

  const { userLocation } = useAuth();

  const favRef = useRef(null);

  const {
    data: allDishesData,
    fetchNextPage: fetchNextAllDishesPage,
    hasNextPage: hasNextAllDishesPage
  } = useInfiniteQuery(
    ['allDishes'],
    ({ pageParam = 1 }) => getAllDishes(pageParam, 10),
    {
      getNextPageParam: currentPage =>
        currentPage.meta.next_page &&
        currentPage.meta.next_page <= currentPage.meta.total_pages
          ? currentPage.meta.next_page
          : null
    }
  );

  const {
    data: nearDishesData,
    fetchNextPage: fetchNextNearDishesPage,
    hasNextPage: hasNextNearDishesPage
  } = useInfiniteQuery(
    ['nearDishes', userLocation],
    ({ pageParam = 1 }) =>
      getNearDishes(
        { latitude: userLocation.lat, longitude: userLocation.lng },
        pageParam,
        10
      ),
    {
      getNextPageParam: currentPage =>
        currentPage &&
        currentPage.meta.next_page &&
        currentPage.meta.next_page <= currentPage.meta.total_pages
          ? currentPage.meta.next_page
          : null
    }
  );

  const {
    data: favoritesData,
    fetchNextPage: fetchNextFavoritesPage,
    hasNextPage: hasNextFavoritesPage
  } = useInfiniteQuery(
    ['favoriteDishes'],
    ({ pageParam = 1 }) => getFavouriteDishes(pageParam),
    {
      getNextPageParam: currentPage =>
        currentPage.meta.next_page &&
        currentPage.meta.next_page <= currentPage.meta.total_pages
          ? currentPage.meta.next_page
          : null
    }
  );

  useEffect(() => {
    if (isTablet) setDisplaying('near');
  }, [isTablet]);

  useEffect(() => {
    if (allDishesData)
      setAllDishes(
        allDishesData?.pages.flatMap(page => (page.data ? page.data : []))
      );
  }, [allDishesData]);

  useEffect(() => {
    if (nearDishesData)
      setNearDishes(
        nearDishesData?.pages.flatMap(page =>
          page && page.data ? page.data : []
        )
      );
  }, [nearDishesData]);

  useEffect(() => {
    if (favoritesData)
      setFavouriteDishes(
        favoritesData?.pages.flatMap(page => (page.data ? page.data : []))
      );
  }, [favoritesData]);

  useEffect(() => {
    const getData = async () => {
      const chefsData = await getAllChefs();
      chefsData && setChefs(chefsData.data);
    };

    getData();
  }, []);
  return (
    <>
      <NearDishesMap chefs={chefs} />
      <DishesContainer>
        <MainContainer>
          <LeftContainer>
            {(displaying === 'default' || displaying === 'near') && (
              <DishListContainer>
                <TitleContainer>
                  <Title color="accent">Pratos próximos</Title>
                  {!isTablet &&
                    (displaying === 'near' && !isTablet ? (
                      <SeeMoreToggle onClick={() => setDisplaying('default')}>
                        {' '}
                        Voltar
                      </SeeMoreToggle>
                    ) : (
                      <SeeMoreToggle onClick={() => setDisplaying('near')}>
                        {' '}
                        Ver mais
                      </SeeMoreToggle>
                    ))}
                </TitleContainer>
                {nearDishes.length ? (
                  <CardList
                    type="near"
                    onScroll={
                      hasNextNearDishesPage ? fetchNextNearDishesPage : null
                    }
                    dishes={nearDishes}
                    direction="row"
                    $fullWidth={displaying === 'near'}
                  />
                ) : (
                  <InfoText> Não existem pratos próximos</InfoText>
                )}
              </DishListContainer>
            )}
            {(displaying === 'default' || displaying === 'all') && (
              <DishListContainer>
                <TitleContainer>
                  <Title color="accent">Pratos</Title>
                  {!isTablet &&
                    (displaying === 'all' ? (
                      <SeeMoreToggle onClick={() => setDisplaying('default')}>
                        {' '}
                        Voltar
                      </SeeMoreToggle>
                    ) : (
                      <SeeMoreToggle onClick={() => setDisplaying('all')}>
                        {' '}
                        Ver mais
                      </SeeMoreToggle>
                    ))}
                </TitleContainer>
                <CardList
                  type="all"
                  onScroll={
                    hasNextAllDishesPage ? fetchNextAllDishesPage : null
                  }
                  dishes={allDishes}
                  direction="row"
                  $fullWidth={displaying === 'all'}
                />
              </DishListContainer>
            )}
          </LeftContainer>
          {(displaying === 'default' || displaying === 'favorites') && (
            <FavoritesContainer ref={favRef}>
              <TitleContainer>
                <Title>Favoritos</Title>
                {!isTablet &&
                  (displaying === 'favorites' && !isTablet ? (
                    <SeeMoreToggle
                      $accent={true}
                      onClick={() => setDisplaying('default')}
                    >
                      Voltar
                    </SeeMoreToggle>
                  ) : (
                    <SeeMoreToggle
                      $accent={true}
                      onClick={() => setDisplaying('favorites')}
                    >
                      {' '}
                      Ver mais
                    </SeeMoreToggle>
                  ))}
              </TitleContainer>
              {favouriteDishes.length ? (
                <CardList
                  type="favorites"
                  onScroll={
                    hasNextFavoritesPage ? fetchNextFavoritesPage : null
                  }
                  dishes={favouriteDishes}
                  direction={displaying === 'favorites' ? 'row' : 'column'}
                  $fullWidth={displaying === 'favorites'}
                />
              ) : (
                <InfoText> Adicione pratos à sua lista de favoritos</InfoText>
              )}
            </FavoritesContainer>
          )}
        </MainContainer>
      </DishesContainer>
      <MobileFooter setDisplaying={setDisplaying} />
    </>
  );
};
