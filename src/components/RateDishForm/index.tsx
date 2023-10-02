import { useState } from 'react';
import {
  DishImage,
  DishInfoContainer,
  RateDishContainer,
  RatingComment,
  RatingCommentContainer,
  RatingContainer,
  RatingInnerContainer,
  Star,
  StarsContainer,
  TitleComment
} from './styled';
import { Rating } from '../../types/Rating';
import { BsStar, BsStarFill } from 'react-icons/bs';
import { Dish } from '../../types/Dish';
import { Title } from '../Title';

interface RateDishFormProps {
  dish: Dish;
  addRating: (rating: Rating) => void;
}

export const RateDishForm = ({ dish, addRating }: RateDishFormProps) => {
  const [rating, setRating] = useState<Rating>({
    user_name: '',
    dishId: dish.id,
    rate: 1,
    comment: ''
  });
  const rateGrades = [1, 2, 3, 4, 5];
  return (
    <RateDishContainer>
      <DishInfoContainer>
        <Title color="default">{dish.name}</Title>
        <DishImage src={dish.images[0]} />
      </DishInfoContainer>
      <RatingContainer>
        <RatingInnerContainer>
          <StarsContainer>
            {rateGrades.map(rate => (
              <Star
                onClick={() => {
                  setRating(prev => ({ ...prev, rate: rate }));
                  addRating({ ...rating, rate: rate });
                }}
              >
                {rate <= rating.rate ? <BsStarFill /> : <BsStar />}
              </Star>
            ))}
          </StarsContainer>
          <TitleComment>Deixa aqui seu comentário</TitleComment>
          <RatingCommentContainer>
            <RatingComment
              onChange={e =>
                setRating(prev => ({ ...prev, comment: e.target.value }))
              }
              onBlur={() => addRating(rating)}
            ></RatingComment>
          </RatingCommentContainer>
        </RatingInnerContainer>
      </RatingContainer>
    </RateDishContainer>
  );
};
