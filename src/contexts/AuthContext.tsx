import React, { createContext, useEffect, useState } from 'react';
import { ContextProps, UserInformation } from './AuthContext.interfaces';

const initialUser: UserInformation = {
  name: '',
  role: '',
  token: '',
};

export const AuthContext = createContext({} as ContextProps);

export const AuthProvider = ({ children }: any) => {
  useEffect(() => {
    const userStorage = localStorage.getItem('user');
    console.log(userStorage)
    if (userStorage) setUser(JSON.parse(userStorage));
  }, []);

  const [user, setUser] = useState<UserInformation>(initialUser);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
