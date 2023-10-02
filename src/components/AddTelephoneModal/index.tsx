import { FiPhone, FiXCircle } from 'react-icons/fi';
import {
  ButtonClose,
  ContainerInput,
  ContainerTitleClose,
  InputModal,
  ModalContent,
  TitleModal
} from '../EditProfile/styled';
import Modal from 'react-modal';
import { Button } from '../Button';
import { useState } from 'react';
import { customStyles } from '../../consts/modalStyles';
import * as Yup from 'yup';
import { messageErrors } from '../../consts/messageErrors';
import { MessageErrorsContainer } from '../../pages/Login/styled';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (values: string) => Promise<void>;
}

export const AddTelephoneModal = ({
  closeModal,
  isOpen,
  onSubmit
}: EditUserModalProps) => {
  const [newPhone, setNewPhone] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const validateAndSubmit = async () => {
    try {
      await validation.validate({ number: newPhone }, { abortEarly: false });

      await onSubmit(newPhone);

      setValidationErrors([]);

      closeModal();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.map(e => e.message);
        setValidationErrors(errors);
      }
    }
  };

  const validation = Yup.object().shape({
    number: Yup.string()
      .matches(
        /^[0-9]{10,11}$/,
        messageErrors.telephones_attributes.number.invalid
      )
      .required(messageErrors.telephones_attributes.number.required)
  });

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Adicionar"
      style={customStyles}
    >
      <ModalContent>
        <ContainerTitleClose>
          <TitleModal>Adicionar Telefones</TitleModal>

          <ButtonClose onClick={closeModal}>
            <FiXCircle />
          </ButtonClose>
        </ContainerTitleClose>

        <ContainerInput size="large">
          <FiPhone />
          <InputModal
            type="text"
            placeholder="Digite um número de telefone"
            value={newPhone}
            onChange={e => setNewPhone(e.target.value)}
          />
        </ContainerInput>

        {validationErrors.map((error, index) => (
          <MessageErrorsContainer key={index}>{error}</MessageErrorsContainer>
        ))}

        <Button
          variant="primary"
          size="medium"
          type="button"
          onClick={validateAndSubmit}
        >
          Adicionar
        </Button>
      </ModalContent>
    </Modal>
  );
};
