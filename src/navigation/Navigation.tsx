import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth, Error404 } from '../components';
import { AuthContext } from '../contexts/AuthContext';
import {
  EmployeeInfo,
  Employees,
  History,
  Holidays,
  HolidaysRegister,
  HolidaysCatalogue,
  Login,
  Request,
  VacationSeniority,
} from '../pages';

export interface Routes {
  root: '/';
  request: '/request';
  employees: '/employees';
  employeesinfo: `/employees/${number}`;
  employeeinfo: '/employeeinfo';
  history: '/history';
  holidays: '/holidays';
  holidaysCatalogue: '/holidays/catalogue';
  holidaysRegister: `/holidays/register/${number}`;
  vacations_seniority: '/vacations_seniority';
}

export const Navigation = () => {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          user.role !== '' ? (
            user.role === 'admin' ? (
              <Navigate to="/request" />
            ) : (
              <Navigate to="/employeeinfo" />
            )
          ) : (
            <Login />
          )
        }
      />
      {user.role === 'admin' && (
        <>
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
            path="/holidays/catalogue"
            element={
              <Auth>
                <HolidaysCatalogue />
              </Auth>
            }
          />
          <Route
            path="/holidays/register/*"
            element={
              <Auth>
                <HolidaysRegister />
              </Auth>
            }
          />
        </>
      )}

      <Route
        path="/employeeinfo"
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
      <Route
        path="*"
        element={
          <Auth>
            <Error404 />
          </Auth>
        }
      />
    </Routes>
  );
};
