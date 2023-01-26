import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiHR from '../api/ApiHR';
import { Routes } from '../navigation/Navigation';
import { ContextProps, UserInformation } from './AuthContext.interfaces';

const initialUser: UserInformation = {
  name: '',
  role: '',
  token: '',
};

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
