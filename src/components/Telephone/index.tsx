import { useState } from 'react';
import { Telephone } from '../../types/Telephone';
import { api } from '../../service/api';
import queryClient from '../../service/reactQuery/queryClient';
import { FiEdit, FiPhone, FiSave, FiTrash2 } from 'react-icons/fi';
import {
  ContainerTelephoneProfile,
  WrapperEditDelete,
  WrapperInputsPhones
} from './styled';
import * as Yup from 'yup';
import { messageErrors } from '../../consts/messageErrors';
import { MessageErrorsContainer } from '../../pages/Login/styled';
import { updateTelephone } from '../../service/api/telephone';
import { handleRequestError } from '../../utils/handleRequestError';
import { AxiosError } from 'axios';
import { Input } from '../Input';

interface TelephoneProfileProps {
  telephone: Telephone;
}

export const TelephoneProfile = ({ telephone }: TelephoneProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTelephone, setNewTelephone] = useState(telephone.number);
  const [validationError, setValidationError] = useState<string | null>(null);

  const validation = Yup.object().shape({
    number: Yup.string()
      .matches(
        /^[0-9]{10,11}$/,
        messageErrors.telephones_attributes.number.invalid
      )
      .required(messageErrors.telephones_attributes.number.required)
  });

  const handlePressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      try {
        await validation.validate(
          { number: newTelephone },
          { abortEarly: false }
        );
        setValidationError(null);

        await updateTelephone(newTelephone, telephone.id);
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        setIsEditing(false);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          setValidationError(error.message);
        }
      }
    }
  };
  const handleSaveClick = async () => {
    try {
      await validation.validate(
        { number: newTelephone },
        { abortEarly: false }
      );
      setValidationError(null);

      await updateTelephone(newTelephone, telephone.id);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        setValidationError(error.message);
      }
    }
  };

  const deletePhoneNumber = async (telephone_id: string) => {
    try {
      await api.delete(`/clients/telephones/${telephone_id}`);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (error) {
      handleRequestError(error as AxiosError);
    }
  };

  return (
    <ContainerTelephoneProfile>
      <strong>Número:</strong>
      {isEditing ? (
        <WrapperInputsPhones>
          <WrapperEditDelete>
            <Input
              Icon={FiPhone}
              type="tel"
              onKeyUp={handlePressEnter}
              value={newTelephone}
              onChange={e => setNewTelephone(e.target.value)}
              isFormik={false}
            />
            {/* <InputPhone
              type="tel"
              onKeyUp={handlePressEnter}
              value={newTelephone}
              onChange={e => setNewTelephone(e.target.value)}
            /> */}
            <span onClick={() => handleSaveClick()}>
              {' '}
              <FiSave />
            </span>
          </WrapperEditDelete>
          {validationError && (
            <MessageErrorsContainer>{validationError}</MessageErrorsContainer>
          )}
        </WrapperInputsPhones>
      ) : (
        <>
          {telephone.number}{' '}
          <WrapperEditDelete>
            <span onClick={() => setIsEditing(true)}>
              <FiEdit />
            </span>
            <span onClick={() => deletePhoneNumber(telephone.id)}>
              <FiTrash2 />
            </span>
          </WrapperEditDelete>
        </>
      )}
    </ContainerTelephoneProfile>
  );
};
