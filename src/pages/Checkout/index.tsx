import QRCode from 'react-qr-code';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { useAuth } from '../../contexts/authContext';
import { useCart } from '../../contexts/cartContex';
import {
  CheckoutContainer,
  Container,
  NoAddress,
  NoAddressContainer,
  PriceContainer,
  QrCodeContainer
} from './styled';
import { formatCurrency } from '../../utils/formatCurrency';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../routes';
import { useEffect } from 'react';

export const Checkout = () => {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { getTotalPrice, cartItems, confirmPayment } = useCart();

  const value = formatCurrency(getTotalPrice());

  useEffect(() => {
    if (cartItems.length === 0) navigate(routes.cart);
  }, []);
  return (
    <Container>
      {user?.addresses?.length ? (
        <>
          <Title>Pagamento</Title>
          <CheckoutContainer>
            <QrCodeContainer>
              <QRCode value={`Pagamento no valor de ${value}`} />
            </QrCodeContainer>
            <PriceContainer>{value}</PriceContainer>
            <Button
              size="medium"
              variant="primary"
              onClick={() => {
                confirmPayment();
                navigate(routes.rating);
              }}
            >
              Confirmar
            </Button>
          </CheckoutContainer>
        </>
      ) : (
        <NoAddressContainer>
          <NoAddress>
            <Title>Nenhum endereço cadastrado</Title>
            <Button
              size="large"
              variant="primary"
              onClick={() => navigate(routes.profile)}
            >
              Adicionar endereço
            </Button>
          </NoAddress>
        </NoAddressContainer>
      )}
    </Container>
  );
};
