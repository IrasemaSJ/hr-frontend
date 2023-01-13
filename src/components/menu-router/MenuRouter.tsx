import React, { useRef } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { Routes } from '../../navigation/Navigation';
// import { ParamRoutes } from '../../navigation/Navigation';

export const MenuRouter = () => {
  // const navigate:(url:ParamRoutes) => void = useNavigate()
  //TODO: search a way to set the type to the router
  const navigate: (url: Routes[keyof Routes]) => void = useNavigate();

  //get the path name of url to active the right item menu
  const { pathname } = useLocation();
  const pathnameFirstLine = useRef(pathname).current.split('/')[1];

  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={[pathnameFirstLine]}
      items={[
        {
          key: 'request',
          icon: <UserOutlined />,
          label: 'request',
          onClick: () => navigate('/request'),
        },
        {
          key: 'employees',
          icon: <VideoCameraOutlined />,
          label: 'employees',
          onClick: () => navigate(`/employees/2`),
        },
        {
          key: 'history',
          icon: <UploadOutlined />,
          label: 'history',
          onClick: () => navigate('/history'),
        },
        {
          key: 'holidays',
          icon: <UploadOutlined />,
          label: 'holidays',
          onClick: () => navigate('/holidays'),
        },
        {
          key: 'vacations_seniority',
          icon: <UploadOutlined />,
          label: 'Vacation Seniority',
          onClick: () => navigate('/vacations_seniority'),
        },
      ]}
    />
  );
};
