/* eslint-disable react-refresh/only-export-components */
import { useRoutes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import routers from './router';
import FallBack from '~/components/FallBack';
// Permission
import { RejectRoute, ProtectedRoute } from './PermissionRoute';

// Layout
import AuthLayout from '~/layout/AuthLayout';
import MainLayout from '~/layout/MainLayout';

// Auth
import Login from '~/pages/auth/login';
import Register from '~/pages/auth/register';
import ResetPassword from '~/pages/auth/reset-password';

// Error page
import NotFound from '~/pages/error/NotFoundPage';
import Forbidden from '~/pages/error/ForbiddenPage';

// Page
import Home from '~/pages/home/Home';
const Settings = lazy(() => import('~/pages/settings/Settings'));

// Booking
import Booking from '~/pages/booking/booking';

export default function useRouteElement() {
  return useRoutes([
    // Main Layout Route
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
              path: routers.booking.pathName,
              element: <Booking />
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
    // Error Route
    { path: routers.error.forbidden, element: <Forbidden /> },
    { path: routers.error.notFound, element: <NotFound /> },
    { path: routers.error.allError, element: <NotFound /> }
  ]);
}
