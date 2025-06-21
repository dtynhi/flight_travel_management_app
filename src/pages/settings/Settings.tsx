import { Tabs } from 'antd';
import { MdOutlineManageAccounts, MdOutlineSecurity } from 'react-icons/md';

import { SettingInformation, SettingSecurity } from './components';

function Settings() {
  return (
    <div className='pe-4'>
      <Tabs
        defaultActiveKey='1'
        items={[
          {
            key: '1',
            label: (
              <div className='flex items-center'>
                <MdOutlineManageAccounts size={20} className='me-1' />
                <span>Thông tin</span>
              </div>
            ),
            children: <SettingInformation />
          },
          {
            key: '3',
            label: (
              <div className='flex items-center'>
                <MdOutlineSecurity size={20} className='me-2' />
                <span>Bảo mật</span>
              </div>
            ),
            children: <SettingSecurity />
          }
        ]}
      />
    </div>
  );
}

export default Settings;
