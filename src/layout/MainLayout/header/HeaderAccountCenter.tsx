import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LuUser } from 'react-icons/lu';
import { IoIosLogOut } from 'react-icons/io';
import { Popover } from 'antd';

import useAppContext from '~/hooks/useAppContext';
import routers from '~/routers/router';
import { LogoutBtn } from '~/components/Button';
import UserAvatar from '~/components/UserAvatar/UserAvatar';
import { commonUtil } from '~/utils';

function HeaderAccountCenter() {
  const { profile } = useAppContext();
  const [openPopover, setOpenPopover] = useState(false);

  const popoverContent = (
    <div>
      <Link onClick={() => setOpenPopover(false)} to={routers.settings.fullPath}>
        <div className='flex items-center text-[16px] text-sm py-2 px-4 cursor-pointer hover:bg-zinc-100 text-gray-600 min-w-[200px]'>
          <LuUser size={16} />
          <span className='ms-3'>Accounts setting</span>
        </div>
      </Link>
      <LogoutBtn>
        <div className='flex items-center text-[16px] text-sm py-2 px-4 cursor-pointer hover:bg-zinc-100 text-gray-600 min-w-[180px]'>
          <IoIosLogOut size={16} />
          <span className='ms-3'>Log out</span>
        </div>
      </LogoutBtn>
    </div>
  );
  return (
    <Popover
      styles={{ body: { padding: '4px 0', borderRadius: 8 } }}
      arrow={false}
      trigger={'click'}
      content={popoverContent}
      placement='bottomRight'
      open={openPopover}
      onOpenChange={(visible) => setOpenPopover(visible)}
    >
      <div className='flex items-center px-2 py-1 rounded-md bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors duration-300 h-[40px]'>
        <span className='me-1 text-gray-500 text-[14px]'>{commonUtil.getFullName(profile, 'email')}</span>
        <UserAvatar name={commonUtil.getFullName(profile, 'email')} />
      </div>
    </Popover>
  );
}

export default HeaderAccountCenter;
