import { AxiosError } from 'axios';

export const handleForgotPasswordErrors = (error: AxiosError) => {
  if (error.response) {
    const status = error.response.status;
    if (status === 404) {
      return 'Usuário não encontrado';
    }
  }

  return 'Ocorreu um erro ao processar a solicitação. Por favor, tente novamente mais tarde.';
};
