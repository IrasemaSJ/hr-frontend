import React, { useContext, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { MenuRouter } from '../menu-router/MenuRouter';
import './MainLayout.css';
import { ReactComponent as Logo } from '../../assets/logo_improving.svg';
import { AuthContext } from '../../contexts/AuthContext';
import { ReactComponent as Logo2 } from '../../assets/improving_isotype.svg';

type Props = {
  children: JSX.Element;
};

export const MainLayout = ({ children }: Props) => {
  const { user, logOut } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
        width="250"
      >
        <div className={collapsed ? 'mainlayout-logo2' : 'mainlayout-logo'}>
          {collapsed ? <Logo2 /> : <Logo width="100%" />}
        </div>
        <MenuRouter />
      </Sider>
      <Layout className="mainlayout-site-layout">
        <Header
          style={{
            padding: '0',
            paddingRight: '20px',
            background: colorBgContainer,
            justifyContent: 'space-between',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: 'mainlayout-trigger',
                onClick: () => setCollapsed(!collapsed),
              },
            )}
            Welcome:&nbsp;
            <i>
              <strong>{user.name}</strong>
            </i>
          </span>
          <Button onClick={logOut}>Logout</Button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: 'auto',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
