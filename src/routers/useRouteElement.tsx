/* eslint-disable react-refresh/only-export-components */
import { useRoutes } from 'react-router-dom';
import { Suspense } from 'react';

import routers from './router';
import FallBack from '~/components/FallBack';
import { RejectRoute, ProtectedRoute } from './PermissionRoute';

// Layout
import AuthLayout from '~/layout/AuthLayout';
import MainLayout from '~/layout/MainLayout';

// Auth
import Login from '~/pages/auth/login';
import Register from '~/pages/auth/register';
import ResetPassword from '~/pages/auth/reset-password';

// Error pages
import NotFound from '~/pages/error/NotFoundPage';
import Forbidden from '~/pages/error/ForbiddenPage';

// App pages
import ReportYear from '~/pages/report/ReportYear';
import ReportMonth from '~/pages/report/ReportMonth';
import Settings from '~/pages/settings';
import FlightSearchPage from '~/pages/search/FlightSearchPage';
import AddFlight from '~/pages/flight/AddFlight';
import Permission from '~/components/Permission/Permission';
import FlightDetailPage from '~/pages/search/FlightSearchPage';
import Booking from '~/pages/booking/booking';

// Regulation
import RegulationPage from '~/pages/regulation/regulation';
import { AirportPage } from '~/pages/airport';
import EmployeePage from '~/pages/employee';

// My Tickets
import MyTicketsPage from '~/pages/ticket/MyTicketsPage';

export default function useRouteElement() {
  return useRoutes([
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: routers.settings.pathName,
              element: (
                <Suspense fallback={<FallBack />}>
                  <Settings />
                </Suspense>
              )
            },
            {
              path: routers.report.pathName,
              element: <Permission.Outlet hasAuthority={['ADMIN', 'EMPLOYEE']} fallback={<Forbidden />} />,
              children: [
                {
                  path: routers.report.monthly.pathName,
                  element: <ReportMonth />
                },
                {
                  path: routers.report.yearly.pathName,
                  element: <ReportYear />
                }
              ]
            },
            {
              path: routers.addFlight.pathName,
              element: <AddFlight />
            },
            { path: routers.flightSearch.pathName, element: <FlightSearchPage /> },
            {
              path: routers.booking.pathName,
              element: <MyTicketsPage />
            },
            {
              path: '/flight/:flightId',
              element: <FlightDetailPage />
            },
            {
              path: '/flight/:flightId',
              element: <FlightDetailPage />
            },
            {
              path: routers.regulation.pathName,
              element: <RegulationPage />
            },
            {
              path: routers.airport.pathName,
              element: <AirportPage />
            },
            {
              path: '/my-tickets',
              element: <MyTicketsPage />
            },
            {
              path: routers.employee.pathName,
              element: <EmployeePage />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <RejectRoute />,
      children: [
        {
          path: routers.auth.pathName,
          children: [
            {
              path: '',
              element: <AuthLayout />,
              children: [
                { path: routers.auth.login.pathName, element: <Login /> },
                { path: routers.auth.register.pathName, element: <Register /> },
                { path: routers.auth.resetPassword.pathName, element: <ResetPassword /> }
              ]
            }
          ]
        }
      ]
    },
    { path: routers.error.forbidden, element: <Forbidden /> },
    { path: routers.error.notFound, element: <NotFound /> },
    { path: routers.error.allError, element: <NotFound /> }
  ]);
}


