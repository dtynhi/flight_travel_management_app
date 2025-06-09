import useAppContext from '~/hooks/useAppContext';

interface IPermissionProps {
  roles?: string[];
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}

function Permission({ roles = [], children, fallback }: IPermissionProps) {
  const { isAuthenticated, shouldCheckAuth } = useAppContext();
  if (!isAuthenticated || shouldCheckAuth || roles?.length === 0) {
    return fallback || null;
  }
  // if (!roles.includes(profile?.role as UserRole)) {
  //   return fallback || null;
  // }
  return children;
}

export default Permission;
