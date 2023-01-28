import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../layout/MainLayout';
import { AuthContext } from '../../contexts/AuthContext';
import { Routes } from '../../navigation/Navigation';

type Props = {
  children: JSX.Element;
};

export const Auth = ({ children }: Props) => {
  const navigate: (url: Routes[keyof Routes]) => void = useNavigate();
  const { user } = useContext(AuthContext);
  const [auth, setAuth] = useState<any>(null);

  useEffect(() => {
    setAuth(user);
    if (auth) {
      if (user.name === '' || user.role === '') {
        navigate('/');
      }
    }
  }, [auth, navigate, user]);

  return <MainLayout>{children}</MainLayout>;
};
