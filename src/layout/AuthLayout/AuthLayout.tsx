import { Outlet } from 'react-router-dom';
import images from '~/assets/images';

function AuthLayout() {
  return (
    <div className='min-h-screen bg-[#ffedd5] flex justify-center items-center px-2'>
      <div className='w-full max-w-[1100px] py-6 px-6 bg-white rounded-xl flex flex-col md:flex-row'>
        <div className='hidden md:flex flex-1 items-center justify-end pr-4'>
          <img src={images.formBanner} alt='Banner' className='max-h-full object-contain' />
        </div>
        <div className='flex-1 flex items-center justify-center px-4'>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
