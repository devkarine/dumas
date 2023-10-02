import { useState } from 'react';
import { Formik } from 'formik';
import { FiMail } from 'react-icons/fi';

import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer,
  SubTitle,
  Title
} from './styled';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';
import { DefaultLink } from '../../components/DefaultLink';
import * as Yup from 'yup';
import { messageErrors } from '../../consts/messageErrors';
import { handleForgotPassword } from '../../service/api/auth';
import { handleForgotPasswordErrors } from '../../utils/handleForgotPasswordErros';
import { AxiosError } from 'axios';
import { routes } from '../../routes';

interface FormRecoverProps {
  email: string;
}

export const StepOne = ({
  onSuccess
}: {
  onSuccess: (resetToken: string) => void;
}) => {
  const [loading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues = {
    email: ''
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email(messageErrors.email.invalid)
      .matches(
        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        messageErrors.email.invalid
      )
      .required(messageErrors.email.required)
  });

  const onSubmit = async (values: FormRecoverProps) => {
    try {
      setIsLoading(true);
      const response = await handleForgotPassword(values);

      if (response.reset_password_token) {
        onSuccess(response.reset_password_token);
      }
    } catch (error) {
      const errorMessage = handleForgotPasswordErrors(error as AxiosError);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({ isSubmitting, errors, touched, isValid }) => (
        <FormContainer>
          <Title>Esqueci minha senha</Title>
          <SubTitle>Recuperar minha senha</SubTitle>
          <InputContainer>
            <Input Icon={FiMail} placeholder="Email" name="email" />
            {touched.email && errors.email && (
              <MessageErrorsContainer>{errors.email}</MessageErrorsContainer>
            )}

            <Button
              variant="primary"
              size="large"
              type="submit"
              disabled={isSubmitting || !isValid}
              loading={loading}
            >
              Recuperar senha
            </Button>
          </InputContainer>

          {error && <MessageErrorsContainer>{error}</MessageErrorsContainer>}

          <DefaultLink variant="primary" to={routes.login}>
            Voltar
          </DefaultLink>
        </FormContainer>
      )}
    </Formik>
  );
};
