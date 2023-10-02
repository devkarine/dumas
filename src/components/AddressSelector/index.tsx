import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useCart } from '../../contexts/cartContex';
import { AddressDescription, AddressTitle } from '../Nav/styled';
import { AddressInfo, SelectorContainer } from './styled';
import { useAuth } from '../../contexts/authContext';
import { closeOnClickOutside } from '../../utils/closeOnClickOutside';
import { getAddresses } from '../../service/api/address';
import { Address } from '../../types/Address';
import { useQuery } from 'react-query';

interface AddressSelectorProps {
  closeSelector: () => void;
}
export const AddressSelector = ({ closeSelector }: AddressSelectorProps) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const { setActiveAddress } = useCart();
  const selectorRef = useRef(null);

  useEffect(() => {
    const listener = (e: MouseEvent) =>
      closeOnClickOutside(e, selectorRef, closeSelector);
    document.addEventListener('click', listener, true);
    return () => {
      document.removeEventListener('click', listener, true);
    };
  }, []);

  const { data } = useQuery(['addresses'], getAddresses);
  useEffect(() => {
    console.log(data);
    if (data) {
      setAddresses(data.data);
    }
  }, [data]);

  return (
    <SelectorContainer ref={selectorRef}>
      {addresses.length
        ? addresses.map(address => (
            <AddressInfo
              key={address.id}
              onClick={() => {
                setActiveAddress(address);
                closeSelector();
              }}
            >
              <>
                <AddressTitle>{address.name}</AddressTitle>
                <AddressDescription>{`${address.public_place}, ${address.number}`}</AddressDescription>
              </>
            </AddressInfo>
          ))
        : ''}
    </SelectorContainer>
  );
};
