import AppIcon from '../Icon/AppIcon';

function LoadingIcon() {
  return (
    <span className='flex justify-end'>
      <AppIcon.Loading className='animate-spin text-primary text-lg' />
    </span>
  );
}

export default LoadingIcon;
