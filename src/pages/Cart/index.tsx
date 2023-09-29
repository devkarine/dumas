import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { CartItemCard } from '../../components/CartItemCard';
import { Title } from '../../components/Title';
import { useCart } from '../../contexts/cartContex';
import { formatCurrency } from '../../utils/formatCurrency';
import {
  CartContainer,
  CartFooter,
  CartInfoContainer,
  CartInfoText,
  CartInfoTitle,
  ItensContainer
} from './styled';
import { routes } from '../../routes';

export const Cart = () => {
  const navigate = useNavigate();
  const { chefsInCart, getItensPerChef, getTotalPrice } = useCart();
  return (
    <CartContainer>
      <Title color="accent">Carrinho</Title>
      {chefsInCart.length ? (
        chefsInCart.map(chef => (
          <ItensContainer>
            <>
              <Title>{chef.name}</Title>
              {getItensPerChef(chef.id).map(item => (
                <CartItemCard item={item} />
              ))}
            </>
          </ItensContainer>
        ))
      ) : (
        <ItensContainer>
          <CartInfoContainer>
            <CartInfoTitle>O seu carrinho está vazio</CartInfoTitle>
            <CartInfoText>
              Que tal conferir alguns pratos saborosos preparados pelos nossos
              chefes e fazer o seu pedido?
            </CartInfoText>
            <Button
              size="large"
              variant="primary"
              onClick={() => navigate(routes.home)}
            >
              Conferir pratos
            </Button>
          </CartInfoContainer>
        </ItensContainer>
      )}
      <CartFooter>
        <Title color="accent">{formatCurrency(getTotalPrice())}</Title>
        <Button
          size="medium"
          variant="primary"
          onClick={() => navigate(routes.checkout)}
        >
          Comprar
        </Button>
      </CartFooter>
    </CartContainer>
  );
};
