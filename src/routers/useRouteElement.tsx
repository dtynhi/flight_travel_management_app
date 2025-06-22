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
import Home from '~/pages/home/Home';
import ReportYear from '~/pages/report/ReportYear';
import ReportMonth from '~/pages/report/ReportMonth';
import Settings from '~/pages/settings';
import FlightSearchPage from '~/pages/search/FlightSearchPage';
import AddFlight from '~/pages/flight/AddFlight';
import FlightList from '~/pages/flight/FlightList';
import EditFlight from '~/pages/flight/EditFlight';
import Permission from '~/components/Permission/Permission';
import Booking from '~/pages/booking/booking';
import FlightDetailPage from '~/pages/search/FlightDetailPage';

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
            { path: routers.home.pathName, element: <Home /> },
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
            { path: routers.addFlight.pathName, element: <AddFlight /> },
            { path: routers.flightList.pathName, element: <FlightList /> },
            { path: routers.editFlight.pathName, element: <EditFlight /> },
            { path: routers.flightSearch.pathName, element: <FlightSearchPage /> },
            {
              path: routers.booking.pathName,
              element: <Booking />
            },
            {
            path: '/flight/:flightId',
            element: <FlightDetailPage />,
            },
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
