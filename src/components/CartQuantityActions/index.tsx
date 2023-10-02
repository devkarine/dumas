import { Action, QuantityContainer } from './styled';
import { CartItem } from '../../types/CartItem';
import { useCart } from '../../contexts/cartContex';

interface CartQuantityActionsProps {
  item: CartItem;
}

export const CartQuantityActions = ({ item }: CartQuantityActionsProps) => {
  const { removeFromCart, addToCart } = useCart();
  return (
    <>
      <Action onClick={() => removeFromCart(item.item)}>-</Action>
      <QuantityContainer>{item.quantity}</QuantityContainer>
      <Action onClick={() => addToCart(item.item)}>+</Action>
    </>
  );
};
