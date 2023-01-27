import { useContext, useState } from 'react';
import { ReactComponent as ImprovingLogo } from '../../assets/logo_improving.svg';
import { ReactComponent as SignIn } from '../../assets/sign_in_ms.svg';
import { Alert, Input } from 'antd';
import { AuthContext } from '../../contexts/AuthContext';
import './Login.css';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Routes } from '../../navigation/Navigation';
import { useNavigate } from 'react-router-dom';
import ApiHR from '../../api/ApiHR';
import { Loader } from '../../components';

export interface Credentials {
  email: string;
  password: string;
}

const initialCredential: Credentials = {
  email: '',
  password: '',
};

const initialError: Credentials = {
  email: '',
  password: '',
};

export const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [credentials, setCredentials] = useState(initialCredential);
  const [error, setError] = useState(initialError);
  const [errorServer, setErrorServer] = useState<string[] | string>('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate: (url: Routes[keyof Routes]) => void = useNavigate();

  const login = async () => {
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
      /**---------------------Validations for form -------------------------*/

      const res = await ApiHR.post('users/login', credentials);
      //set global user
      setUser(res.data);
      //set the global user to the local storage
      localStorage.setItem('user', JSON.stringify(res.data));
      if (res.data.role === 'admin') {
        navigate('/request');
      } else {
        navigate('/employeeinfo');
      }
    } catch (error: any) {
      setErrorServer(error.response.data.message);
      setIsLoading(false);
    }
  };

  const changeCredentials = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-general">
      <div className="login-container">
        <ImprovingLogo className="login-logotype" />
        <Loader show={isLoading} tip="Loading" size="large" />
        <div
          style={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          {errorServer && (
            <Alert
              message="Error"
              showIcon
              description={
                Array.isArray(errorServer)
                  ? errorServer.map((el, index) => <div key={index}>{el}</div>)
                  : errorServer
              }
              type="error"
            />
          )}
          <Input
            size="large"
            name="email"
            placeholder="email"
            prefix={<MailOutlined />}
            value={credentials.email}
            onChange={changeCredentials}
            status={error.email === '' ? '' : 'error'}
          />
          <span style={{ color: 'red' }}>{error.email}</span>
          <Input.Password
            size="large"
            name="password"
            placeholder="password"
            prefix={<LockOutlined />}
            value={credentials.password}
            onChange={changeCredentials}
            status={error.password === '' ? '' : 'error'}
          />
          <span style={{ color: 'red' }}>{error.password}</span>
        </div>
        <button className="login-button" onClick={login}>
          <SignIn />
        </button>
      </div>
    </div>
  );
};
