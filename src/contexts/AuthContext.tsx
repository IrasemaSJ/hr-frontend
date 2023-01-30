import React, { createContext, useEffect, useState } from 'react';
import {
  ContextProps,
  Credentials,
  UserInformation,
} from './AuthContext.interfaces';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Routes } from '../navigation/Navigation';
import ApiHR from '../api/ApiHR';
import { getToken } from '../helpers/getToken';

export const initialUser: UserInformation = {
  name: '',
  role: '',
};
const initialCredential: Credentials = {
  email: '',
  password: '',
};
const initialError: Credentials = {
  email: '',
  password: '',
};

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<UserInformation>(initialUser);
  const [credentials, setCredentials] = useState(initialCredential);
  const [error, setError] = useState(initialError);
  const [errorServer, setErrorServer] = useState<string[] | string>('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate: (url: Routes[keyof Routes]) => void = useNavigate();
  // check if token exists in local storage
  useEffect(() => {
    //helper
    getToken({ setUser, navigate });
  }, []);

  const logIn = async () => {
    try {
      /**---------------------Validations for form -------------------------*/
      let errorCredentials: Credentials = {
        email: '',
        password: '',
      };

      if (credentials.email === '') {
        errorCredentials = {
          ...errorCredentials,
          email: 'Email must not be empty',
        };
      }

      if (credentials.password === '') {
        errorCredentials = {
          ...errorCredentials,
          password: 'Password must not be empty',
        };
      }

      if (errorCredentials.email !== '' || errorCredentials.password !== '') {
        return setError(errorCredentials);
      }
      //active the loader
      setIsLoading(true);

      const res = await ApiHR.post('users/login', credentials);

      //decode payload token
      const payload: UserInformation = jwt_decode(res.data.token);
      //set global user payload
      setUser(payload);
      // get credential to initial
      setCredentials(initialCredential);
      //set the global user to the local storage
      localStorage.setItem('token', res.data.token);
      if (payload.role === 'admin') {
        navigate('/request');
        setIsLoading(false);
        setError(initialError);
        setErrorServer('');
      } else {
        navigate('/employeeinfo');
        setIsLoading(false);
        setError(initialError);
        setErrorServer('');
      }
    } catch (error: any) {
      setErrorServer(error.response.data.message);
      setIsLoading(false);
    }
  };

  const logOut = () => {
    localStorage.removeItem('token');
    setUser(initialUser);
    navigate('/');
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logOut,
        logIn,
        credentials,
        error,
        errorServer,
        isLoading,
        setCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
