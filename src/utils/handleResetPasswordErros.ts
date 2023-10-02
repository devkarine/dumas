import { AxiosError } from 'axios';

export const handleResetPasswordErrors = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 500) {
      return 'Código inválido';
    }
  }

  return 'Ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde.';
};
