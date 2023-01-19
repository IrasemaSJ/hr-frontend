import React, { useRef } from 'react';
import { Menu } from 'antd';
import {
  UserOutlined,
  UnorderedListOutlined,
  ReadOutlined,
  CalendarOutlined,
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
      defaultSelectedKeys={[pathnameFirstLine]}
      items={[
        {
          key: 'request',
          icon: <UnorderedListOutlined />,
          label: 'Requests',
          onClick: () => navigate('/request'),
        },
        {
          key: 'employees',
          icon: <UserOutlined />,
          label: 'Employees',
          onClick: () => navigate(`/employees`),
        },
        {
          key: 'history',
          icon: <ReadOutlined />,
          label: 'History',
          onClick: () => navigate('/history'),
        },
        {
          key: 'holidays',
          icon: <CalendarOutlined />,
          label: 'Holidays',
          onClick: () => navigate('/holidays'),
        },
        {
          key: 'vacations_seniority',
          icon: <CalendarOutlined />,
          label: 'Vacation',
          onClick: () => navigate('/vacations_seniority'),
        },
      ]}
      style={{ border: 'none' }}
    />
  );
};
