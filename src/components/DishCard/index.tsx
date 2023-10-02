import { formatCurrency } from '../../utils/formatCurrency';
import {
  CardContainer,
  DishImage,
  DishTitle,
  DishPrice,
  CardsContainer
} from './styled';
import { useNavigate } from 'react-router-dom';
import { Dish } from '../../types/Dish';

interface DishCardProps {
  chefDish: Dish;
}

export const DishCard = ({ chefDish }: DishCardProps) => {
  const navigate = useNavigate();

  const handleDishTitleClick = () => {
    navigate(`/prato/${chefDish.id}`);
  };
  return (
    <CardsContainer>
      <CardContainer>
        <DishImage
          src={chefDish.images || 'images/image_placeholder.png'}
          alt={chefDish.chef.name}
        />
        <DishTitle onClick={() => handleDishTitleClick()}>
          {chefDish.name}
        </DishTitle>
        <DishPrice>{formatCurrency(chefDish.unit_price)}</DishPrice>
      </CardContainer>
    </CardsContainer>
  );
};
