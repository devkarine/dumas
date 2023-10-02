import { Link, LinkProps } from 'react-router-dom';
import { Container } from './styled';

export interface DefaultLinkProps extends LinkProps {
  variant: 'primary' | 'secondary';
}
export function DefaultLink({ variant, children, ...props }: DefaultLinkProps) {
  return (
    <Container variant={variant}>
      <Link {...props}>{children}</Link>
    </Container>
  );
}
