import { ReactNode } from 'react';
import { MainTitle } from './styled';

interface TitleProps {
  children: ReactNode;
  color?: 'default' | 'accent';
}
export const Title = ({ children, color }: TitleProps) => {
  return <MainTitle color={color || 'default'}>{children}</MainTitle>;
};
