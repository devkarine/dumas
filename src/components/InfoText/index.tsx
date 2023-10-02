// import { Container } from './styles';

import { PropsWithChildren } from 'react';
import { Text } from './styled';

export const InfoText = ({ children }: PropsWithChildren) => {
  return <Text>{children}</Text>;
};
