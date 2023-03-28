import { useContext, useState } from 'react';
import { ReactComponent as ImprovingLogo } from '../../assets/logo_improving.svg';
import { ReactComponent as SignIn } from '../../assets/sign_in_ms.svg';
import { Alert, Input } from 'antd';
import { AuthContext } from '../../contexts/AuthContext';
import './Login.css';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
// import { Routes } from '../../navigation/Navigation';
// import { useNavigate } from 'react-router-dom';
// import ApiHR from '../../api/ApiHR';
import { Loader } from '../../components';

export const Login = () => {
  const { credentials, error, errorServer, isLoading, logIn, setCredentials } =
    useContext(AuthContext);

  const changeCredentials = (e: React.FormEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  return (
    <div className="login-general">
      <div className="login-container">
        <ImprovingLogo className="login-logotype" />
        <Loader show={isLoading} />
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
        <button className="login-button" onClick={logIn}>
          <SignIn />
        </button>
      </div>
    </div>
  );
};
