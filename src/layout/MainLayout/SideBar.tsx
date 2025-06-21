import { Menu, MenuProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';

import routers from '~/routers/router';
import AppIcon from '~/components/Icon/AppIcon';

import { FileTextOutlined } from '@ant-design/icons'; // icon mặc định từ antd



const siderStyle: React.CSSProperties = {
  color: '#fff',
  height: '100vh',
  backgroundColor: 'white',
  overflowY: 'auto'
};

function SideBar() {
  const pathName = useLocation().pathname;
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    if (pathName) {
      setActiveKey(pathName);
    }
  }, [pathName]);

  const navigate = useNavigate();
  const changeTab = (path: string) => {
    navigate(path);
  };

  const menuItems: MenuProps['items'] = useMemo(() => {
    const items = [
      {
        key: routers.home.fullPath,
        icon: <AppIcon.Home size={18} />,
        label: 'Home',
        onClick: () => changeTab(routers.home.fullPath)
      },
      {
        type: 'divider'
      },
      {
        key: routers.settings.fullPath,
        label: 'Settings',
        icon: <AppIcon.Setting size={18} />,
        onClick: () => changeTab(routers.settings.fullPath)
      },
      {
        key: routers.booking.fullPath,
        icon: <AppIcon.Plane size={18} />, // hoặc icon nào bạn có
        label: 'Mua vé máy bay',
        onClick: () => changeTab(routers.booking.fullPath)
      },
      {
        key: routers.regulation.fullPath,
        icon: <FileTextOutlined />,
        label: 'Regulation',
        onClick: () => changeTab(routers.regulation.fullPath)
      }


    ] as MenuProps['items'];
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Sider style={siderStyle} collapsible theme='light'>
      <Menu
        selectedKeys={[activeKey]}
        onClick={({ key }) => {
          setActiveKey(key);
        }}
        style={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}
        inlineIndent={16}
        mode='inline'
        theme='light'
        items={menuItems}
      />
    </Sider>
  );
}

export default SideBar;
