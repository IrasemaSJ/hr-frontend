import { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Auth, Error404 } from '../components';
import { AuthContext } from '../contexts/AuthContext';
import { ProjectResponsibles } from '../pages/project_responsibles/ProjectResponsibles';
import {
  EmployeeInfo,
  Employees,
  Holidays,
  HolidaysRegister,
  HolidaysCatalogue,
  Login,
  Request,
  VacationSeniority,
} from '../pages';
import { PreauthorizationAction } from '../pages/preauthorization/PreauthorizationAction';

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
  project_responsibles: '/project_responsibles';
  preauthorizationRequest: `requests/preauthorization/${string}`;
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
        path="/project_responsibles"
        element={
          <Auth>
            <ProjectResponsibles />
          </Auth>
        }
      />
      {/* Se prefirio usar query para el token porque por params se rompe por los caracteres . */}
      <Route path="/preauthorization" element={<PreauthorizationAction />} />
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
