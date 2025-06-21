import { Outlet } from 'react-router-dom';
import useAppContext from '~/hooks/useAppContext';

type UserAuthority = 'ADMIN' | 'EMPLOYEE' | 'USER';
interface IPermissionProps {
  hasAuthority?: UserAuthority[];
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

function Permission({ hasAuthority = [], children, fallback }: IPermissionProps) {
  const { isAuthenticated, profile } = useAppContext();

  if (!isAuthenticated) {
    return fallback;
  }

  // Convert role to array for comparison
  const userRoles = profile?.role ? (Array.isArray(profile.role) ? profile.role : [profile.role]) : [];

  if (!hasAuthority.length) {
    return children;
  }

  if (userRoles.some((authority) => hasAuthority.includes(authority))) {
    return children;
  }

  return fallback || null;
}

function PermissionOutLet({ hasAuthority = [], fallback }: IPermissionProps) {
  const { isAuthenticated, profile } = useAppContext();

  if (!isAuthenticated) {
    return fallback;
  }

  const userRoles = profile?.role ? (Array.isArray(profile.role) ? profile.role : [profile.role]) : [];

  if (!hasAuthority.length) {
    return <Outlet />;
  }

  if (userRoles.some((authority) => hasAuthority.includes(authority))) {
    return <Outlet />;
  }

  return fallback || null;
}

Permission.Outlet = PermissionOutLet;

export default Permission;
