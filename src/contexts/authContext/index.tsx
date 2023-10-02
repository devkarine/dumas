import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { handleLogin, handleSignup, LoginProps } from '../../service/api/auth';
import { User } from '../../types/Users';
import secureLocalStorage from 'react-secure-storage';
import { handleLoginErrors } from '../../utils/handleLoginsErrors';
import { AxiosError } from 'axios';
import { configureAxiosToken } from '../../utils/configureAxiosAuth';
import { getLocationWithIPAddress } from '../../service/api/location';
import { routes } from '../../routes';
import { handleSignupErrors } from '../../utils/handleSignupErrors';
import { configureLocalStorage } from '../../utils/configureLocalStorage';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextProps {
  user?: User;
  setUser: (user: User) => void;
  signIn: (credentials: LoginProps) => Promise<void>;
  signUp: (user: User) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  error: string;
  loading: boolean;
  userLocation: { lat: number; lng: number };
}

const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User>();
  const [error, setError] = useState('');
  const [loading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const navigate = useNavigate();
  const getLocation = async () => {
    const data = await getLocationWithIPAddress();
    if (data) {
      setUserLocation({ lat: Number(data.lat), lng: Number(data.lng) });
    }
  };
  async function signIn({ email, password }: LoginProps) {
    try {
      const response = await handleLogin({
        email,
        password
      });
      if (response && response.access_token) {
        configureLocalStorage(
          response.access_token,
          response.refresh_token,
          response.user
        );
        setIsAuthenticated(true);
        setIsLoading(true);
        setUser(response.user);
        configureAxiosToken();
        if (
          response.user?.addresses?.length &&
          response.user.addresses[0].latitude &&
          response.user.addresses[0].longitude
        ) {
          setUserLocation({
            lat: response.user.addresses[0].latitude,
            lng: response.user.addresses[0].longitude
          });
        } else {
          getLocation();
        }
        navigate(routes.home);
      }
    } catch (error) {
      const messageError = handleLoginErrors(error as AxiosError);
      setError(messageError);
    } finally {
      setIsLoading(false);
    }
  }

  async function signUp(values: User) {
    try {
      const response = await handleSignup(values);
      if (response && response.access_token) {
        configureLocalStorage(
          response.access_token,
          response.refresh_token,
          response.user
        );
        setIsAuthenticated(true);
        setUser(response.user);
        configureAxiosToken();
        navigate(routes.home);
      }
    } catch (error) {
      const messageError = handleSignupErrors(error as AxiosError);
      setError(messageError);
    }
  }

  function signOut() {
    secureLocalStorage.clear();

    navigate(routes.login);

    setIsAuthenticated(false);
  }

  useEffect(() => {
    const authUser = secureLocalStorage.getItem('user');
    const token = secureLocalStorage.getItem('token');

    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      navigate(routes.login);
      return;
    }
    configureAxiosToken();
    if (authUser) {
      const storedUser = JSON.parse(authUser as string);
      setUser(storedUser);
      if (
        storedUser.addresses.lenght > 0 &&
        storedUser.addresses[0].latitude &&
        storedUser.addresses[0].longitude
      ) {
        setUserLocation({
          lat: storedUser.addresses[0].latitude,
          lng: storedUser.addresses[0].longitude
        });
      } else {
        const getLocation = async () => {
          const data = await getLocationWithIPAddress();
          if (data) {
            setUserLocation({ lat: Number(data.lat), lng: Number(data.lng) });
          }
        };
        getLocation();
      }
    }
    setIsAuthenticated(true);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        user,
        setUser,
        error,
        loading,
        userLocation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'Você somente pode usar este hook debaixo de um <AuthContextProvider>'
    );
  }

  return context;
};
