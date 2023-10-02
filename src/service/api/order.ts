import { AxiosError } from 'axios';
import { apiRoutes } from '../../routes';
import { Order } from '../../types/Order';
import { handleRequestError } from '../../utils/handleRequestError';
import { api } from '../api';

export const createOrder = async (order: Order) => {
  try {
    await api.post(apiRoutes.order.create, order);
  } catch (error) {
    handleRequestError(error as AxiosError);
  }
};
