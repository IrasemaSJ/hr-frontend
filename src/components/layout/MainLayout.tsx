import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, theme } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import { MenuRouter } from '../menu-router/MenuRouter';
import './MainLayout.css';
import { useLocation } from 'react-router-dom';
import { Login } from '../../pages';

type Props = {
  children: JSX.Element;
};

export const MainLayout = ({ children }: Props) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="mainlayout-logo" />
        <MenuRouter />
      </Sider>
      <Layout className="mainlayout-site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'mainlayout-trigger',
              onClick: () => setCollapsed(!collapsed),
            },
          )}
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
