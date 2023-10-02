import { IconBaseProps } from 'react-icons';
import { StyledIconButton } from './styled';
interface IconButtonProps {
  icon: React.ReactElement<IconBaseProps>;
  onClick: () => void;
}

export const IconButton = ({ icon, onClick }: IconButtonProps) => {
  return <StyledIconButton onClick={onClick}>{icon}</StyledIconButton>;
};
