import { InputHTMLAttributes } from 'react';
import { Container } from './styled';
import { Field } from 'formik';
import { IconType } from 'react-icons';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon: IconType;
  as?: string;
  isFormik?: boolean;
}

export function Input({
  name,
  type,
  placeholder,
  Icon,
  as,
  isFormik = true,
  ...props
}: InputProps) {
  return (
    <Container size="large">
      <Icon />
      {isFormik ? (
        <Field
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          as={as || ''}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          {...props}
        />
      )}
    </Container>
  );
}
