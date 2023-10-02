import { ButtonHTMLAttributes } from 'react';
import { ButtonContainer } from './styled';
import { CircularSpinner } from '../CircularSpinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary';
  size: 'medium' | 'large';
  loading?: boolean;
}

export const Button = ({
  children,
  variant,
  size,
  loading,
  ...props
}: ButtonProps) => {
  return (
    <ButtonContainer $variant={variant} size={size} {...props}>
      {loading ? <CircularSpinner /> : children}
    </ButtonContainer>
  );
};
