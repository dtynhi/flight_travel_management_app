import { useEffect } from 'react';
import { timeUtil } from '~/utils';

function ApplicationEventListener({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const handleUpdateProfile = (event: CustomEvent) => {
      if (event?.detail) {
        timeUtil.TIME_ZONE = event.detail?.timezone;
      }
    };

    window.addEventListener('updateProfile', handleUpdateProfile as EventListener);
    return () => {
      window.removeEventListener('updateProfile', handleUpdateProfile as EventListener);
    };
  }, []);

  return <>{children}</>;
}

export default ApplicationEventListener;
