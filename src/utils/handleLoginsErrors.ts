import { AxiosError } from 'axios';

export const handleLoginErrors = (e: AxiosError) => {
  if (e.response?.status === 401) {
    return 'Email ou senha incorretos';
  }

  return 'Erro desconhecido';
};
