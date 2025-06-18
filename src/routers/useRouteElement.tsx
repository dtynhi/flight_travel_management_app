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
import SearchResult from '~/pages/search/SearchResult';
import AddFlight from '~/pages/flight/AddFlight';
import FlightList from '~/pages/flight/FlightList';
import EditFlight from '~/pages/flight/EditFlight';


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
            { path: routers.search.pathName, element: <SearchResult /> },
            { path: routers.addFlight.pathName, element: <AddFlight /> },
            { path: routers.flightList.pathName, element: <FlightList /> },
            { path: routers.editFlight.pathName, element: <EditFlight/> } // Route edit flight
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



