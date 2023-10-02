import { useState } from 'react';
import { ErrorMessage, Formik } from 'formik';
import { FiMail, FiLock } from 'react-icons/fi';
import { useAuth } from '../../contexts/authContext';
import { routes } from '../../routes';
import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer,
  Paragrafo,
  SubTitle,
  Title,
  WrapperLink
} from './styled';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DefaultLink } from '../../components/DefaultLink';
import * as Yup from 'yup';
import { messageErrors } from '../../consts/messageErrors';

interface FormLoginProps {
  email: string;
  password: string;
}

export const initialValues = {
  email: '',
  password: ''
};

export const Login = () => {
  const { signIn } = useAuth();
  const [loading, setIsLoading] = useState(false);

  const onSubmit = async (values: FormLoginProps) => {
    setIsLoading(true);
    await signIn(values);

    setIsLoading(false);
  };

  const validation = Yup.object().shape({
    email: Yup.string()
      .email(messageErrors.email.invalid)
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        messageErrors.email.invalid
      )
      .required(messageErrors.email.required),
    password: Yup.string()
      .min(6, messageErrors.password.invalid)
      .required(messageErrors.password.required)
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validation}
      validateOnMount={true}
    >
      {({ isSubmitting, isValid }) => (
        <FormContainer>
          <Title>Login</Title>
          <SubTitle>Entre e faça seu pedido</SubTitle>
          <InputContainer>
            <Input Icon={FiMail} placeholder="Email" name="email" />
            <ErrorMessage name="email" component={MessageErrorsContainer} />

            <Input
              placeholder="Senha"
              type="password"
              name="password"
              Icon={FiLock}
            />
            <ErrorMessage name="password" component={MessageErrorsContainer} />

            <Button
              variant="primary"
              size="large"
              type="submit"
              disabled={isSubmitting || !isValid}
              loading={loading}
            >
              Entrar
            </Button>
          </InputContainer>

          <DefaultLink variant="secondary" to={routes.recoverPassword}>
            Esqueceu sua senha
          </DefaultLink>

          <Paragrafo>
            Não possui conta?
            <WrapperLink>
              Então
              <DefaultLink variant="primary" to={routes.signUp.profile}>
                Faça seu cadastro.
              </DefaultLink>
            </WrapperLink>
          </Paragrafo>
        </FormContainer>
      )}
    </Formik>
  );
};
