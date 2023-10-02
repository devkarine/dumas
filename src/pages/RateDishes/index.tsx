import { useEffect, useState } from 'react';
import { RateDishForm } from '../../components/RateDishForm';
import { useCart } from '../../contexts/cartContex';
import { Rating } from '../../types/Rating';
import { ButtonContainer, Container } from './styled';
import { Button } from '../../components/Button';
import { rateDish } from '../../service/api/dishes';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';

export const RateDishes = () => {
  const { clearCartItems, isPaid } = useCart();
  const navigate = useNavigate();

  const submitRatings = () => {
    ratings.map(rating => {
      rateDish(rating);
    });
    toast.success('Obrigado por nos avaliar');
    clearCartItems();
    navigate(routes.home);
  };

  useEffect(() => {
    if (!isPaid) navigate(routes.checkout);
  }, []);

  const [ratings, setRatings] = useState<Rating[]>([]);
  const { cartItems } = useCart();
  const addRating = (newRating: Rating) => {
    const ratingExists = ratings.find(
      rating => rating.dishId === newRating.dishId
    );
    if (ratingExists) {
      setRatings(
        ratings.map(rating =>
          rating.dishId === newRating.dishId ? newRating : rating
        )
      );
    } else {
      setRatings(prev => [...prev, newRating]);
    }
  };

  return (
    <Container>
      {cartItems.map(cartItem => (
        <RateDishForm dish={cartItem.item} addRating={addRating} />
      ))}
      <ButtonContainer>
        <Button variant="primary" size="medium" onClick={submitRatings}>
          Avaliar
        </Button>
      </ButtonContainer>
    </Container>
  );
};
