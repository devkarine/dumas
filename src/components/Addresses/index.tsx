import React, { useState } from 'react';
import { api } from '../../service/api';
import queryClient from '../../service/reactQuery/queryClient';
import { Address } from '../../types/Address';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ContainerAddressProfile, WrapperEditDelete } from './styled';
import { useCart } from '../../contexts/cartContex';
import { AddAddressModal } from '../AddAddressModal';

interface AddressProfileProps {
  address: Address;
}
//TODO resolver bug enviar nulos no put
export const AddressProfile: React.FC<AddressProfileProps> = ({
  address
}: AddressProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { activeAddress, setActiveAddress } = useCart();

  const handleSubmit = async (address: Partial<Address>) => {
    console.log('enviar dados', address);
    const response = await api.put<Address>(
      `/clients/addresses/${address.id}`,
      {
        address
      }
    );

    if (address.id === activeAddress?.id) {
      setActiveAddress(response.data);
    }
    queryClient.invalidateQueries({ queryKey: ['profile'] });
    queryClient.invalidateQueries({ queryKey: ['addresses'] });
    setIsEditing(false);
  };

  const handleActionClick = (action: 'edit' | 'delete') => {
    if (action === 'edit') {
      setIsEditing(true);
    } else if (action === 'delete') {
      deleteAddress(address.id!);
    }
  };

  const deleteAddress = async (address_id: string) => {
    try {
      await api.delete(`/clients/addresses/${address_id}`);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ContainerAddressProfile>
      {isEditing ? (
        <div>
          <AddAddressModal
            closeModal={() => setIsEditing(false)}
            isOpen={isEditing}
            address={address}
            onSubmit={handleSubmit}
          />
        </div>
      ) : (
        <>
          <strong>{address.name}:</strong>
          {address.public_place}, {address.number}
          <WrapperEditDelete>
            <span onClick={() => handleActionClick('edit')}>
              <FiEdit />
            </span>
            <span onClick={() => handleActionClick('delete')}>
              <FiTrash2 />
            </span>
          </WrapperEditDelete>
        </>
      )}
    </ContainerAddressProfile>
  );
};
