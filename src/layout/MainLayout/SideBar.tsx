import { Menu, MenuProps } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';

import routers from '~/routers/router';
import AppIcon from '~/components/Icon/AppIcon';

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

  const userRole = 'ADMIN'; // ❗ Bạn có thể thay bằng logic lấy role từ context/store

  const menuItems: MenuProps['items'] = useMemo(() => {
    const items: MenuProps['items'] = [
      {
        key: routers.home.fullPath,
        icon: <AppIcon.Home size={18} />,
        label: 'Home',
        onClick: () => changeTab(routers.home.fullPath)
      }
    ];

    if (userRole === 'ADMIN' || userRole === 'EMPLOYEE') {
      items.push({
        key: 'report',
        label: 'Báo cáo',
        icon: <AppIcon.Report size={18} />,
        children: [
          {
            key: routers.report.monthly.fullPath,
            label: 'Báo cáo tháng',
            onClick: () => changeTab(routers.report.monthly.fullPath)
          },
          {
            key: routers.report.yearly.fullPath,
            label: 'Báo cáo năm',
            onClick: () => changeTab(routers.report.yearly.fullPath)
          }
        ]
      });
    }

    items.push(
      { type: 'divider' },
      {
        key: routers.settings.fullPath,
        label: 'Settings',
        icon: <AppIcon.Setting size={18} />,
        onClick: () => changeTab(routers.settings.fullPath)
      }
    );

    return items;
  }, [userRole]);

  return (
    <Sider style={siderStyle} collapsible theme="light">
      <Menu
        selectedKeys={[activeKey]}
        onClick={({ key }) => {
          setActiveKey(key);
          changeTab(key);
        }}
        style={{ height: 'calc(100% - 60px)', overflowY: 'auto' }}
        inlineIndent={16}
        mode="inline"
        theme="light"
        items={menuItems}
      />
    </Sider>
  );
}

export default SideBar;
