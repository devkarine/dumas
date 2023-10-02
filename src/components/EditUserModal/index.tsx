import { FiXCircle } from 'react-icons/fi';
import {
  ButtonClose,
  ContainerTitleClose,
  ModalContent,
  TitleModal
} from '../EditProfile/styled';
import Modal from 'react-modal';
import { EditProfile } from '../EditProfile';
import { CircularSpinner } from '../CircularSpinner';
import { SpinnerContainer } from '../../pages/Profile/styled';
import { User } from '../../types/Users';
import { customStyles } from '../../consts/modalStyles';

interface EditUserModalProps {
  isOpen: boolean;
  closeModal: () => void;
  user?: User;
  onSubmit: (values: User) => Promise<void>;
}

export const EditUserModal = ({
  closeModal,
  isOpen,
  user,
  onSubmit
}: EditUserModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Editar"
      style={customStyles}
    >
      <ModalContent>
        <ContainerTitleClose>
          <TitleModal>Editar Nome e Email</TitleModal>

          <ButtonClose onClick={closeModal}>
            <FiXCircle />
          </ButtonClose>
        </ContainerTitleClose>

        {user ? (
          <EditProfile values={user} onSubmit={onSubmit} />
        ) : (
          <SpinnerContainer>
            <CircularSpinner /> Carregando dados...
          </SpinnerContainer>
        )}
      </ModalContent>
    </Modal>
  );
};
