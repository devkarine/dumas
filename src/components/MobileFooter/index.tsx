import { SetStateAction } from 'react';
import { FooterContainer, FooterOption } from './styled';
import { DisplayingOptions } from '../../pages/Home';

interface MobileFooterProps {
  setDisplaying: React.Dispatch<SetStateAction<DisplayingOptions>>;
}
export const MobileFooter = ({ setDisplaying }: MobileFooterProps) => {
  return (
    <FooterContainer>
      <FooterOption onClick={() => setDisplaying('near')}>
        Pratos próximos
      </FooterOption>
      <FooterOption onClick={() => setDisplaying('favorites')}>
        Pratos favoritos
      </FooterOption>
      <FooterOption onClick={() => setDisplaying('all')}>
        Outros pratos
      </FooterOption>
    </FooterContainer>
  );
};
