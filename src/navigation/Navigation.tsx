import { useContext } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Auth, Error404 } from '../components';
import { AuthContext } from '../contexts/AuthContext';
import {
  EmployeeInfo,
  Employees,
  History,
  Holidays,
  Login,
  Request,
  VacationSeniority,
} from '../pages';

export interface Routes {
  root: '/';
  request: '/request';
  employees: '/employees';
  employeeinfo: `/employees/${number}`;
  history: '/history';
  holidays: '/holidays';
  vacations_seniority: '/vacations_seniority';
}

const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user.token ? <Navigate to="/request" /> : <Login />}
        />
        <Route
          path="/request"
          element={
            <Auth>
              <Request />
            </Auth>
          }
        />
        <Route
          path="/employees"
          element={
            <Auth>
              <Employees />
            </Auth>
          }
        />
        <Route
          path="/employees/:id"
          element={
            <Auth>
              <EmployeeInfo />
            </Auth>
          }
        />
        <Route
          path="/history"
          element={
            <Auth>
              <History />
            </Auth>
          }
        />
        <Route
          path="/holidays"
          element={
            <Auth>
              <Holidays />
            </Auth>
          }
        />
        <Route
          path="/vacations_seniority"
          element={
            <Auth>
              <VacationSeniority />
            </Auth>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
