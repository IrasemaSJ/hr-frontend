import {
  ContextProps,
  UserInformation,
} from '../contexts/AuthContext.interfaces';
import jwt_decode from 'jwt-decode';
import { Routes } from '../navigation/Navigation';

interface Props {
  setUser: ContextProps['setUser'];
  navigate: (url: Routes[keyof Routes]) => void;
}

export const getToken = async ({ setUser, navigate }: Props) => {
  try {
    const tokenStorage = localStorage.getItem('token');
    if (tokenStorage) {
      const payload: UserInformation = jwt_decode(tokenStorage);
      setUser(payload);
    }
  } catch (error) {
    localStorage.removeItem('token');
    navigate('/');
  }
};
