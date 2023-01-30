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
      //get the header
      const header = jwt_decode(tokenStorage, {
        header: true,
      });
      //get the payload
      const payload: UserInformation = jwt_decode(tokenStorage);
      setUser(payload);
      //TODO: check if there is a way to verify blue part of JWT (header and payload are already verified)
    }
  } catch (error) {
    navigate('/');
    localStorage.removeItem('token');
  }
};
