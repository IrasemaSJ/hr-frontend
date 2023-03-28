/// <reference types="vite-plugin-svgr/client" />
import { useNavigate } from 'react-router-dom';
import { Routes } from '../../navigation/Navigation';
import { ReactComponent as ImprovingLogo } from '../../assets/logo_improving.svg';
import { ReactComponent as SignIn } from '../../assets/sign_in_ms.svg';
import './Login.css';

export const Login = () => {
  const navigate: (url: Routes[keyof Routes]) => void = useNavigate();
  return (
    <div className="login-general">
      <div className="login-container">
        <ImprovingLogo className="login-logotype" />
        <p className="login-text">Welcome to HR System</p>
        <button className="login-button" onClick={() => navigate('/request')}>
          <SignIn />
        </button>
      </div>
    </div>
  );
};
