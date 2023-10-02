import { Cep } from '../../types/Cep';
import { api } from '../api';
import { Address } from '../../types/Address';
import { apiRoutes } from '../../routes';
import { handleRequestError } from '../../utils/handleRequestError';
import { AxiosError } from 'axios';
import { Paginated } from '../../types/Paginated';

export const getAddressByCep = async (cep: string) => {
  const response = await api.get<Cep>(apiRoutes.addresses.cep(cep as string));
  return response.data;
};

export const createAddress = async (address: Address) => {
  try {
    const response = await api.post<Address>(apiRoutes.client.addresses, {
      address
    });

    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
  }
};

export const getAddresses = async () => {
  try {
    const response = await api.get<Paginated<Address>>(
      apiRoutes.addresses.myAddresses
    );
    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
  }
};
