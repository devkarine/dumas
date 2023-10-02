import { InputHTMLAttributes } from 'react';
import { Container } from './styled';
import { Field } from 'formik';
import { IconType } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: IconType;
  as?: string;
}

export function Input({
  name,
  type,
  placeholder,
  Icon,
  as,
  ...props
}: InputProps) {
  return (
    <Container size="large">
      <Icon />
      <Field
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        as={as || ''}
        {...props}
      />
    </Container>
  );
}
