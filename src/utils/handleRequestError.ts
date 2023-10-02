import { AxiosError } from 'axios';
import secureLocalStorage from 'react-secure-storage';
import { routes } from '../routes';
import { toast } from 'react-toastify';

export const handleRequestError = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 401) {
      secureLocalStorage.removeItem('token');
      secureLocalStorage.removeItem('refreshToken');
      secureLocalStorage.removeItem('activeAddress');
      toast.warn('Sessão expirada. Faça login novamente');
      window.location.href = routes.login;
      return;
    }

    if (status === 422) {
      toast.warn(
        'Há um problema com os dados enviados. Tente novamente mais tarde'
      );
      return;
    }

    if (status >= 500) {
      toast.warn(
        'Há um problema com nossos servidores. Tente novamente mais tarde'
      );
      return;
    }
  }

  toast.warn('Erro ao processar requisição');
};
