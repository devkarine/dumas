import { User } from '../types/Users';
import secureLocalStorage from 'react-secure-storage';

export const configureLocalStorage = (
  token: string,
  refreshToken: string,
  user: User | null = null
) => {
  const expDate = new Date();
  expDate.setMinutes(expDate.getMinutes() + 25);
  secureLocalStorage.setItem('tokenExpDate', JSON.stringify(expDate));
  secureLocalStorage.setItem('token', token);
  secureLocalStorage.setItem('refreshToken', refreshToken);
  if (user) secureLocalStorage.setItem('user', JSON.stringify(user));
};
