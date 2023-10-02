import secureLocalStorage from 'react-secure-storage';
import { api } from '../service/api';
import { refreshToken } from '../service/api/auth';
import { configureLocalStorage } from './configureLocalStorage';

export function configureAxiosToken() {
  api.interceptors.request.use(async function (config) {
    const tokenExpDate = secureLocalStorage.getItem('tokenExpDate');
    const refresh = secureLocalStorage.getItem('refreshToken');
    const token = secureLocalStorage.getItem('token');

    if (tokenExpDate) {
      const now = new Date();
      const expDate = new Date(JSON.parse(tokenExpDate as string));

      if (expDate < now) {
        secureLocalStorage.removeItem('tokenExpDate');
        try {
          const data = await refreshToken(refresh as string);
          configureLocalStorage(data.access_token, data.refresh_token);

          config.headers.Authorization = `Bearer ${data.access_token}`;
          return api(config);
        } catch (error) {
          secureLocalStorage.removeItem('refreshToken');
          secureLocalStorage.removeItem('token');
          secureLocalStorage.removeItem('user');

          return Promise.reject(error);
        }
      }
    }

    config.headers.Authorization = `Bearer ${token}`;
    return Promise.resolve(config);
  });
}
