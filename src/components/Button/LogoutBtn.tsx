import { useMutation } from '@tanstack/react-query';
import React from 'react';

import useAppContext from '~/hooks/useAppContext';
import authApi from '~/api/auth.api';

interface LogoutBtnProps {
  children?: React.ReactNode;
}

function LogoutBtn({ children }: LogoutBtnProps) {
  const { reset } = useAppContext();
  const { mutate } = useMutation({
    mutationFn: () => {
      return authApi.logout();
    }
  });
  const handleLogout = () => {
    mutate();
    reset();
  };
  return <div onClick={handleLogout}>{children}</div>;
}
export default LogoutBtn;
