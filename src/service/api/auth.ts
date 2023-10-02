import { User } from '../../types/Users';
import { api } from '../api';

interface LoginResponseProps {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface RefreshToken {
  refresh_token: string;
}

export interface ForgotPasswordProps {
  email?: string;
  token?: string;
  password?: string;
  passwordConfirm?: string;
}

export const handleLogin = async ({ email, password }: LoginProps) => {
  const response = await api.post('/sessions/login', {
    session: {
      email,
      password
    }
  });

  const { data } = response;
  return data;
};

export const refreshToken = async (token: string) => {
  const response = await api.post<LoginResponseProps>('/sessions/refresh', {
    auth: { refresh_token: token }
  });

  return response.data;
};

export async function handleSignup({
  name,
  email,
  password,
  password_confirmation,
  telephones_attributes,
  addresses_attributes
}: User) {
  const response = await api.post<LoginResponseProps>('/registrations/signup', {
    user: {
      name,
      email,
      password,
      password_confirmation,
      telephones_attributes,
      addresses_attributes
    }
  });

  const { data } = response;

  return data;
}

export const handleForgotPassword = async ({ email }: ForgotPasswordProps) => {
  const response = await api.post('/passwords/token', {
    email
  });

  const { data } = response;
  return data;
};

export const handleResetPassword = async ({
  token,
  password,
  passwordConfirm
}: ForgotPasswordProps) => {
  const response = await api.put('/passwords/reset', {
    reset_password_token: token,
    password,
    password_confirmation: passwordConfirm
  });

  const { data } = response;
  return data;
};
