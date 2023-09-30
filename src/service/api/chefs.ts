import { api } from '../api';
import { apiRoutes } from '../../routes';
import { Chef } from '../../types/Chef';
import { Paginated } from '../../types/Paginated';
import { AxiosError } from 'axios';
import { handleRequestError } from '../../utils/handleRequestError';

export const getAllChefs = async () => {
  try {
    const response = await api.get<Paginated<Chef>>(apiRoutes.chefs);

    return response.data;
  } catch (error) {
    handleRequestError(error as AxiosError);
  }
};
