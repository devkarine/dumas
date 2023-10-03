import { FiHome, FiXCircle } from 'react-icons/fi';
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
import { useEffect, useState } from 'react';
import { Address } from '../../types/Address';
import { getAddressByCep } from '../../service/api/address';
import { customStyles } from '../../consts/modalStyles';
import { messageErrors } from '../../consts/messageErrors';
import * as Yup from 'yup';
import { MessageErrorsContainer } from '../../pages/Login/styled';
import { getAndUseLocation } from '../../consts/getLocation';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (values: Address) => Promise<void>;
  address?: Address;
}

export const AddAddressModal = ({
  closeModal,
  isOpen,
  onSubmit,
  address
}: EditUserModalProps) => {
  const [newAddress, setNewAddress] = useState<Address>(
    address
      ? address
      : {
          id: '',
          name: '',
          public_place: '',
          zip_code: '',
          number: '',
          neighborhood: '',
          city_id: '',
          complement: '',
          reference: ''
        }
  );
  const [validationErrors, setValidationErrors] = useState<Partial<Address>>(
    {}
  );
  const handleFieldChange = (field: string, value: string) => {
    setNewAddress({ ...newAddress, [field]: value });
  };

  useEffect(() => {
    const insertLocation = async () => {
      const location = await getAndUseLocation();
      if (!address) {
        setNewAddress(prev => ({
          ...prev,
          latitude: location?.latitude,
          longitude: location?.longitude
        }));
      }
    };

    insertLocation();
  }, []);

  const handleCepChange = async (cep: string) => {
    const cleanedCep = cep.replace(/[^0-9]/g, '');

    if (cleanedCep.length !== 8) {
      alert('CEP deve conter 8 números');
      return;
    }
    try {
      const data = await getAddressByCep(cep);
      setNewAddress(prev => ({
        ...prev,
        city_id: data.city_id,
        neighborhood: data.neighborhood,
        public_place: data.street
      }));
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  const validation = Yup.object().shape({
    name: Yup.string().required(
      messageErrors.addresses_attributes.tipo_endereco.required
    ),
    zip_code: Yup.string()
      .matches(/^\d{8}$/, messageErrors.addresses_attributes.zip_code.invalid)
      .required(messageErrors.addresses_attributes.zip_code.required),
    public_place: Yup.string().required(
      messageErrors.addresses_attributes.public_place.required
    ),
    number: Yup.string().required(
      messageErrors.addresses_attributes.number.required
    ),
    neighborhood: Yup.string().required(
      messageErrors.addresses_attributes.neighborhood.required
    ),
    city_id: Yup.string().required(
      messageErrors.addresses_attributes.city_id.required
    )
  });

  const validateAndSubmit = async () => {
    try {
      await validation.validate(newAddress, { abortEarly: false });
      await onSubmit(newAddress);
      closeModal();
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        error.inner.forEach(err => {
          errors[err.path as string] = err.message;
        });
        setValidationErrors(errors);
      }
    }
  };

  const { content } = customStyles;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Editar Endereços"
      style={{ content: { ...content, maxHeight: '550px' } }}
    >
      <ModalContent>
        <ContainerTitleClose>
          <TitleModal>Adicionar Endereços</TitleModal>

          <ButtonClose onClick={closeModal}>
            <FiXCircle />
          </ButtonClose>
        </ContainerTitleClose>
        <ContainerInput size="large">
          <FiHome />
          <InputModal
            type="text"
            placeholder="Tipo de endereço"
            value={newAddress.name}
            onChange={e => handleFieldChange('name', e.target.value)}
          />
        </ContainerInput>
        {validationErrors.name && (
          <MessageErrorsContainer>
            {validationErrors.name}
          </MessageErrorsContainer>
        )}

        <ContainerInput size="large">
          <FiHome />
          <InputModal
            type="text"
            placeholder="CEP"
            value={newAddress.zip_code}
            onChange={e => {
              handleFieldChange('zip_code', e.target.value);
            }}
            onBlur={e => handleCepChange(e.target.value)}
          />
        </ContainerInput>
        {validationErrors.zip_code && (
          <MessageErrorsContainer>
            {validationErrors.zip_code}
          </MessageErrorsContainer>
        )}

        <ContainerInput size="large">
          <FiHome />
          <InputModal
            type="text"
            placeholder="Logradouro"
            value={newAddress.public_place}
            onChange={e => handleFieldChange('public_place', e.target.value)}
          />
        </ContainerInput>
        {validationErrors.public_place && (
          <MessageErrorsContainer>
            {validationErrors.public_place}
          </MessageErrorsContainer>
        )}

        <ContainerInput size="large">
          <FiHome />
          <InputModal
            type="text"
            placeholder="Número"
            value={newAddress.number}
            onChange={e => handleFieldChange('number', e.target.value)}
          />
        </ContainerInput>
        {validationErrors.number && (
          <MessageErrorsContainer>
            {validationErrors.number}
          </MessageErrorsContainer>
        )}

        <ContainerInput size="large">
          <FiHome />
          <InputModal
            type="text"
            placeholder="Bairro"
            value={newAddress.neighborhood}
            onChange={e => handleFieldChange('neighborhood', e.target.value)}
          />
        </ContainerInput>
        {validationErrors.neighborhood && (
          <MessageErrorsContainer>
            {validationErrors.neighborhood}
          </MessageErrorsContainer>
        )}

        <Button
          variant="primary"
          size="medium"
          type="button"
          onClick={validateAndSubmit}
        >
          Salvar
        </Button>
      </ModalContent>
    </Modal>
  );
};
