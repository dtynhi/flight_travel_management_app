import { Outlet } from 'react-router-dom';
import images from '~/assets/images';

function AuthLayout() {
  return (
    <div className='min-h-screen bg-[#ffedd5] flex justify-center items-center px-2'>
      <div className='w-full max-w-[1100px] py-6 px-6 bg-white rounded-xl grid grid-cols-2'>
        <div className='flex-1 pe-4'>
          <Outlet />
        </div>
        <div className='hidden md:flex flex-1 items-center !h-full '>
          <img src={images.formBanner} />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
