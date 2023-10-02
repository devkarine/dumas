import { AxiosError } from 'axios';
import { apiRoutes } from '../../routes';
import { handleRequestError } from '../../utils/handleRequestError';
import { api } from '../api';

export const createTelephones = async (newPhone: string) => {
  try {
    await api.post(apiRoutes.client.telephone, {
      telephone: { number: newPhone }
    });
  } catch (error) {
    handleRequestError(error as AxiosError);
  }
};

export const updateTelephone = async (
  newTelephone: string,
  telephoneId: string
) => {
  await api.put(`clients/telephones/${telephoneId}`, {
    telephone: { number: newTelephone }
  });
};
