import { useCart } from '../../contexts/cartContex';
import { DeliveryAddress, FooterContainer, FooterText } from './styled';

export const CartFooter = () => {
  const { activeAddress } = useCart();
  return (
    <FooterContainer>
      <FooterText>
        Entrega em:{' '}
        <DeliveryAddress>{`${activeAddress?.public_place}, ${activeAddress?.number}`}</DeliveryAddress>{' '}
      </FooterText>
      <FooterText></FooterText>
    </FooterContainer>
  );
};
