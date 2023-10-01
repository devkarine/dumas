import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { User } from '../../types/Users';
import { Button } from '../../components/Button';
import { CircularSpinner } from '../../components/CircularSpinner';
import {
  ButtonContainer,
  ContainerImg,
  ContainerProfile,
  DecorativeImage,
  SpinnerContainer,
  Strong,
  Title3,
  UserInfo,
  UserInfoAndModalContainer,
  UserInfoContainer,
  WrapperModal
} from './styled';
import { useAuth } from '../../contexts/authContext';
import { TelephoneProfile } from '../../components/Telephone';
import { useQuery } from 'react-query';
import queryClient from '../../service/reactQuery/queryClient';
import { AddressProfile } from '../../components/Addresses';
import { editClient, getClientData } from '../../service/api/client';
import { createAddress } from '../../service/api/address';
import { Address } from '../../types/Address';
import { useTheme } from '../../contexts/themeContext';
import { createTelephones } from '../../service/api/telephone';
import { EditUserModal } from '../../components/EditUserModal';
import { AddTelephoneModal } from '../../components/AddTelephoneModal';
import { AddAddressModal } from '../../components/AddAddressModal';

Modal.setAppElement('#root');

export const Profile: React.FC = () => {
  const [clientData, setClientData] = useState<User>();
  const [nameEmailModalIsOpen, setNameEmailModalIsOpen] = useState(false);
  const [phonesModalIsOpen, setPhonesModalIsOpen] = useState(false);
  const [addressesModalIsOpen, setAddressesModalIsOpen] = useState(false);

  const { theme } = useTheme();
  const { user } = useAuth();
  const { data, isLoading } = useQuery(['profile'], getClientData);

  useEffect(() => {
    if (data) {
      setClientData(data);
    }
  }, [data]);

  function openNameEmailModal() {
    setNameEmailModalIsOpen(true);
  }

  function closeNameEmailModal() {
    setNameEmailModalIsOpen(false);
  }

  function openPhonesModal() {
    setPhonesModalIsOpen(true);
  }

  function closePhonesModal() {
    setPhonesModalIsOpen(false);
  }

  function openAddressesModal() {
    setAddressesModalIsOpen(true);
  }

  function closeAddressesModal() {
    setAddressesModalIsOpen(false);
  }

  const sendEditClient = async (values: User) => {
    const response = await editClient(values);
    setClientData(response);

    closeNameEmailModal();
  };

  const addPhoneNumber = async (newPhone: string) => {
    await createTelephones(newPhone);
    queryClient.invalidateQueries({ queryKey: ['profile'] });

    closePhonesModal();
  };

  const addAddress = async (newAddress: Address) => {
    await createAddress(newAddress);
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    closeAddressesModal();
  };

  const customStyles = {
    content: {
      maxWidth: '500px',
      maxHeight: '470px',
      margin: 'auto',
      padding: '20px',
      backgroundColor: theme === 'light' ? '#FDFDFD' : '#6f6464'
    }
  };
  if (isLoading) {
    return <h2>Carregando Dados...</h2>;
  }
  return (
    <ContainerProfile>
      <WrapperModal>
        <UserInfoAndModalContainer>
          <EditUserModal
            isOpen={nameEmailModalIsOpen}
            closeModal={closeNameEmailModal}
            onSubmit={sendEditClient}
            styles={customStyles}
            user={clientData}
          />

          {clientData ? (
            <UserInfoContainer>
              <Title3>{user?.name}</Title3>
              <UserInfo>
                <Strong>Nome:</Strong> {clientData.name}
              </UserInfo>
              <UserInfo>
                <Strong>Email:</Strong> {clientData.email}
              </UserInfo>
            </UserInfoContainer>
          ) : (
            <SpinnerContainer>
              <CircularSpinner /> Carregando dados...
            </SpinnerContainer>
          )}
        </UserInfoAndModalContainer>
        <ButtonContainer>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={openNameEmailModal}
          >
            Editar
          </Button>
        </ButtonContainer>
      </WrapperModal>
      <WrapperModal>
        <AddTelephoneModal
          isOpen={phonesModalIsOpen}
          closeModal={closePhonesModal}
          styles={customStyles}
          onSubmit={addPhoneNumber}
        />

        {clientData ? (
          <UserInfoContainer>
            {clientData.telephones.map((telephone, index) => (
              <TelephoneProfile
                key={`telephone_${index}`}
                telephone={telephone}
              />
            ))}
          </UserInfoContainer>
        ) : (
          <SpinnerContainer>
            <CircularSpinner /> Carregando dados...
          </SpinnerContainer>
        )}
        <ButtonContainer>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={openPhonesModal}
          >
            Adicionar
          </Button>
        </ButtonContainer>
      </WrapperModal>

      <WrapperModal>
        <AddAddressModal
          closeModal={closeAddressesModal}
          isOpen={addressesModalIsOpen}
          styles={customStyles}
          onSubmit={addAddress}
        />

        {clientData ? (
          <UserInfoContainer>
            {clientData.addresses?.length &&
              clientData.addresses.map((address, index) => (
                <AddressProfile key={`address_${index}`} address={address} />
              ))}
          </UserInfoContainer>
        ) : (
          <SpinnerContainer>
            <CircularSpinner /> Carregando dados...
          </SpinnerContainer>
        )}

        <ButtonContainer>
          <Button
            variant="primary"
            size="medium"
            type="button"
            onClick={openAddressesModal}
          >
            Adicionar
          </Button>
        </ButtonContainer>
      </WrapperModal>
      <ContainerImg>
        <DecorativeImage src="public/undraw_breakfast_psiw 3.svg" alt="prato" />
      </ContainerImg>
    </ContainerProfile>
  );
};
