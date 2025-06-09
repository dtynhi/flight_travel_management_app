import { Navigate, Outlet } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import useAppContext from '~/hooks/useAppContext';
import routers from './router';
import queryKey from '~/constant/query-key';
import userApi from '~/api/app/user.api';
import localStorageService from '~/service/local-storage.service';

export function RejectRoute() {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <Navigate to={routers.home.fullPath} /> : <Outlet />;
}

export function ProtectedRoute() {
  const { isAuthenticated, setShouldCheckAuth, shouldCheckAuth, setProfile } = useAppContext();

  useQuery({
    queryKey: [queryKey.auth.profile],
    queryFn: () => userApi.getUserProfile(),
    onSuccess: (data) => {
      setProfile(data.data.data);
      setShouldCheckAuth(false);
      localStorageService.setProfileToLS(data.data.data);
    },
    enabled: shouldCheckAuth && isAuthenticated,
    cacheTime: 0
  });

  if (!isAuthenticated) {
    const currentUrl = new URL(window.location.href);
    localStorageService.setRedirectUrlToLS(currentUrl.pathname + currentUrl.search);
    return <Navigate to={routers.auth.login.fullPath} />;
  }

  return <Outlet />;
}
