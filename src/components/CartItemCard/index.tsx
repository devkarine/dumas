import { useCart } from '../../contexts/cartContex';
import { CartItem } from '../../types/CartItem';
import { formatCurrency } from '../../utils/formatCurrency';
import { CartQuantityActions } from '../CartQuantityActions';
import {
  CartActions,
  ItemActions,
  ItemContainer,
  ItemDetails,
  ItemImage,
  ItemInfo,
  Price,
  PriceContainer,
  RemoveButton,
  RemoveItemContainer,
  Text
} from './styled';

interface CartItemProps {
  item: CartItem;
}
export const CartItemCard = ({ item }: CartItemProps) => {
  const { deleteFromCart } = useCart();
  const rating =
    item.item.ratings.length > 0
      ? item.item.ratings.reduce((acc, rating) => acc + rating.rate, 0) /
        item.item.ratings.length
      : 0;
  return (
    <ItemContainer>
      <ItemDetails>
        <ItemImage src={item.item.images[0]} />
        <ItemInfo>
          <Text>{item.item.name}</Text>
          <Text>Chef: {item.item.chef.name}</Text>
          <Text>Avaliação: {rating.toFixed(0)}</Text>
          <Text>Preço unitário: {formatCurrency(item.item.unit_price)}</Text>
        </ItemInfo>
      </ItemDetails>

      <CartActions>
        <ItemActions>
          <CartQuantityActions item={item} />
        </ItemActions>
        <PriceContainer>
          <Price>{formatCurrency(item.item.unit_price * item.quantity)}</Price>
        </PriceContainer>
        <RemoveItemContainer>
          <RemoveButton onClick={() => deleteFromCart(item.item)}>
            x
          </RemoveButton>
        </RemoveItemContainer>
      </CartActions>
    </ItemContainer>
  );
};
