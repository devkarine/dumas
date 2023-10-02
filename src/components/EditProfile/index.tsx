import React from 'react';
import { ErrorMessage, Formik } from 'formik';
import { User } from '../../types/Users';
import { Input } from '../Input';
import { FiMail, FiUser } from 'react-icons/fi';
import {
  FormContainer,
  InputContainer,
  MessageErrorsContainer
} from '../../pages/Login/styled';
import { Button } from '../Button';
import * as Yup from 'yup';
import { messageErrors } from '../../consts/messageErrors';

export interface EditProfileProps {
  values: User;
  onSubmit: (values: User) => Promise<void>;
}

export const EditProfile: React.FC<EditProfileProps> = ({
  values,
  onSubmit
}) => {
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
      .required(messageErrors.email.required)
  });
  const handleSubmit = async (values: User) => {
    await onSubmit(values);
  };

  return (
    <Formik
      initialValues={values}
      onSubmit={handleSubmit}
      validationSchema={validation}
    >
      {({ values, handleChange, handleBlur, isValid, isSubmitting }) => (
        <FormContainer>
          <InputContainer>
            <Input
              Icon={FiUser}
              type="text"
              id="name"
              name="name"
              placeholder="Nome"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <ErrorMessage name="name" component={MessageErrorsContainer} />
            <Input
              Icon={FiMail}
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorMessage name="email" component={MessageErrorsContainer} />
          </InputContainer>

          <br />
          <Button
            variant="primary"
            size="medium"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Salvar
          </Button>
        </FormContainer>
      )}
    </Formik>
  );
};
