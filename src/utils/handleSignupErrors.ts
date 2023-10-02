import { AxiosError } from 'axios';

export const handleSignupErrors = (e: AxiosError) => {
  if (e.response?.status === 422) {
    return 'E-mail já cadastrado.';
  }

  return 'Erro desconhecido';
};
