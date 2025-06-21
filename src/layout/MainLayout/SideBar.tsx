import { Menu, MenuProps } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';

import routers from '~/routers/router';
import AppIcon from '~/components/Icon/AppIcon';
import { AppContext } from '~/context/app.context';

const siderStyle: React.CSSProperties = {
  color: '#fff',
  height: '100vh',
  backgroundColor: 'white',
  overflowY: 'auto'
};

function SideBar() {
  const pathName = useLocation().pathname;
  const [activeKey, setActiveKey] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (pathName) {
      setActiveKey(pathName);
    }
  }, [pathName]);

  const changeTab = (path: string) => {
    navigate(path);
  };

  const { profile } = useContext(AppContext);

  const menuItems: MenuProps['items'] = useMemo(() => {
    const items: MenuProps['items'] = [
      {
        key: routers.home.fullPath,
        icon: <AppIcon.Home size={18} />,
        label: 'Home',
        onClick: () => changeTab(routers.home.fullPath)
      }
    ];

    items.push(
      { type: 'divider' },
      {
        key: routers.addFlight.fullPath,
        icon: <AppIcon.Plus size={18} />,
        label: 'Thêm chuyến bay',
        onClick: () => changeTab(routers.addFlight.fullPath)
      },
      {
        key: routers.flightList.fullPath,
        icon: <AppIcon.List size={18} />,
        label: 'Danh sách chuyến bay',
        onClick: () => changeTab(routers.flightList.fullPath)
      },
      {
        key: routers.flightSearch.fullPath,
        icon: <AppIcon.Listing size={18} />,
        label: 'Tra cứu chuyến bay',
        onClick: () => changeTab(routers.flightSearch.fullPath)
      },
      {
        type: 'divider'
      },
      {
        key: routers.settings.fullPath,
        label: 'Settings',
        icon: <AppIcon.Setting size={18} />,
        onClick: () => changeTab(routers.settings.fullPath)
      }
    );

    return items;
  }, [profile?.roles]);

  return (
    <Sider style={siderStyle} collapsible theme='light'>
      <Menu
        selectedKeys={[activeKey]}
        onClick={({ key }) => {
          setActiveKey(key);
          changeTab(key);
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
