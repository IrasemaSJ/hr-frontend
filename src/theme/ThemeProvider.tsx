import { ConfigProvider } from 'antd';

interface Props {
  children: JSX.Element;
}

export const ThemeProvider = ({ children }: Props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          //colorPrimary: '#005596',
          colorPrimary: '#4597D3',
          colorInfo: '#4597D3',
          colorSuccess: '#5BC2A7',
          //colorWarning: '#F5BB41',
          colorWarning: '#ff4d4f',
          colorError: '#ff4d4f',
          colorLink: '#005596',
          //colorLinkActive: '',
          colorLinkHover: '#4597D3',
          //borderRadius: 6,
          //colorBgBase: '#fff',
          //colorTextBase: '#000',
          colorTextDisabled: '#A7A8A9',
          //fontFamily: '',
          //fontSize: 14,
        },
      }}
    >
      {' '}
      {children}
    </ConfigProvider>
  );
};
