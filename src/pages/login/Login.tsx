import './Login.css';
import { ReactComponent as ImprovingLogo } from '../../assets/logo_improving.svg';
import { ReactComponent as SignIn } from '../../assets/sign_in_ms.svg';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="login-general">
      <div className="login-container">
        <ImprovingLogo className="login-logotype" />
        <p className="login-text">Welcome to HR System</p>
        <button className="login-button" onClick={() => navigate('/employees')}>
          <SignIn />
        </button>
      </div>
    </div>
  );
};
