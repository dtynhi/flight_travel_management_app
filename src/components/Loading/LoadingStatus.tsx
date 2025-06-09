import { BsThreeDots } from 'react-icons/bs';
import AppIcon from '../Icon/AppIcon';

interface ILoadingStatusProps {
  status: 'loading' | 'pending' | 'success' | 'error';
}

function LoadingStatus({ status }: ILoadingStatusProps) {
  if (status === 'loading') {
    return <AppIcon.Loading className='animate-spin text-primary text-lg' />;
  }

  if (status === 'pending') {
    return <BsThreeDots className='text-primary text-lg' />;
  }

  if (status === 'success') {
    return <AppIcon.Check className='text-primary text-lg' />;
  }

  if (status === 'error') {
    return <AppIcon.Cancel className='text-red-500 text-lg' />;
  }
}

export default LoadingStatus;
