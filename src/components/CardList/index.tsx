import { useRef } from 'react';
import { Dish } from '../../types/Dish';
import { Card } from '../Card';
import { List } from './styled';
import { handleScroll } from '../../utils/handleScroll';

interface CardListProps {
  dishes: Dish[];
  direction: 'row' | 'column';
  $fullWidth: boolean;
  onScroll: (() => unknown) | ((...arg: unknown[]) => unknown) | null;
  type: 'favorites' | 'all' | 'near';
}
const CardList = ({
  dishes,
  direction,
  $fullWidth,
  type,
  onScroll
}: CardListProps) => {
  const ref = useRef(null);
  return (
    <List
      ref={ref}
      onScroll={() => handleScroll(ref, onScroll)}
      direction={direction}
      $fullWidth={$fullWidth}
    >
      {dishes.length > 0 &&
        dishes.map(dish => (
          <Card key={`dishes_${type}_${dish.id}`} dish={dish}></Card>
        ))}
    </List>
  );
};

export default CardList;
