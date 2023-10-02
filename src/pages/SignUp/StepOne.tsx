import { ErrorMessage, Formik } from 'formik';
import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer,
  SubTitle,
  Title
} from '../Login/styled';
import { FiUser, FiMail, FiLock, FiPhone } from 'react-icons/fi';
import { Input } from '../../components/Input';
import { WrapperButton } from './styled';
import { StepProps } from '.';
import { Button } from '../../components/Button';
import { User } from '../../types/Users';
import { useAuth } from '../../contexts/authContext';
import { messageErrors } from '../../consts/messageErrors';
import * as Yup from 'yup';
import { DefaultLink } from '../../components/DefaultLink';
import { routes } from '../../routes';

export const StepOne: React.FC<StepProps> = ({ next, data }) => {
  const { signUp } = useAuth();

  const handleSubmit = (values: User) => {
    signUp(values);
  };

  const handleContinueToAddress = async (values: User) => {
    next(values);
  };

  const validation = Yup.object().shape({
    name: Yup.string()
      .required(messageErrors.name.required)
      .test(messageErrors.name.test, messageErrors.name.invalid, value => {
        const names = value.split(' ');
        return names.length >= 2;
      }),
    email: Yup.string()
      .email(messageErrors.email.invalid)
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        messageErrors.email.invalid
      )
      .required(messageErrors.email.required),
    password: Yup.string()
      .min(6, messageErrors.password.invalid)
      .required(messageErrors.password.required),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref('password')], messageErrors.password_confirm.invalid)
      .required(messageErrors.password_confirm.required),
    telephones_attributes: Yup.array().of(
      Yup.object({
        number: Yup.string()
          .matches(
            /^[0-9]{10,11}$/,
            messageErrors.telephones_attributes.number.invalid
          )
          .required(messageErrors.telephones_attributes.number.required)
      })
    )
  });

  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validateOnMount={true}
      validationSchema={validation}
    >
      {({ values, isSubmitting, isValid }) => (
        <FormContainer>
          <Title>Cadastro</Title>
          <SubTitle>Informações pessoais</SubTitle>

          <InputContainer>
            <Input Icon={FiUser} placeholder="Nome e Sobrenome" name="name" />

            <ErrorMessage name="name" component={MessageErrorsContainer} />

            <Input Icon={FiMail} placeholder="Email" name="email" />
            <ErrorMessage name="email" component={MessageErrorsContainer} />

            <Input
              placeholder="Senha"
              type="password"
              name="password"
              Icon={FiLock}
            />

            <ErrorMessage name="password" component={MessageErrorsContainer} />
            <Input
              placeholder="Confirmar senha"
              type="password"
              name="password_confirmation"
              Icon={FiLock}
            />

            <ErrorMessage
              name="password_confirmation"
              component={MessageErrorsContainer}
            />

            <Input
              placeholder="Telefone"
              type="phone"
              name="telephones_attributes[0].number"
              Icon={FiPhone}
            />
            <ErrorMessage
              name="telephones_attributes[0].number"
              component={MessageErrorsContainer}
            />

            <WrapperButton>
              <Button
                variant="primary"
                size="large"
                disabled={isSubmitting || !isValid}
                onClick={() => handleContinueToAddress(values)}
                type="submit"
              >
                Continuar para endereço
              </Button>

              <Button
                variant="secondary"
                size="large"
                disabled={isSubmitting || !isValid}
                type="submit"
              >
                Continuar sem endereço
              </Button>
            </WrapperButton>
          </InputContainer>
          <DefaultLink variant="primary" to={routes.login}>
            Voltar
          </DefaultLink>
        </FormContainer>
      )}
    </Formik>
  );
};
