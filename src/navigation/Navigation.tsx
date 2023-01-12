import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth, Error404 } from '../components';
import {
  EmployeeInfo,
  Employees,
  History,
  Holidays,
  Login,
  Request,
  VacationSeniority,
} from '../pages';

// export const routes = {
//   root:'/',
//   request:'/request',
//   employees:'/employees',
//   employeeinfo:'/employees/:id',
//   history:'/history',
//   holidays:'/holidays',
//   vacations_seniority:'/vacations_seniority',
// } as const

// export type ParamRoutes = (typeof routes)[keyof typeof routes];

const Navigation = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
