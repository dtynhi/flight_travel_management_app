import { Menu } from 'antd';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';

import routers from '~/routers/router';
import AppIcon from '~/components/Icon/AppIcon';
import { AppContext } from '~/context/app.context';
import { ItemType, MenuItemType } from 'antd/es/menu/interface';

const siderStyle: React.CSSProperties = {
  color: '#fff',
  height: '100vh',
  backgroundColor: 'white',
  overflowY: 'auto'
};

type IRole = 'ADMIN' | 'EMPLOYEE' | 'USER';

type ISideBarItems = ItemType<MenuItemType> & {
  authorities?: IRole[];
};

function SideBar() {
  const { pathname } = useLocation();
  const [activeKey, setActiveKey] = useState('');
  const navigate = useNavigate();
  const { profile } = useContext(AppContext);

  // Update active key when pathname changes
  useEffect(() => {
    if (pathname) {
      setActiveKey(pathname);
    }
  }, [pathname]);

  const menuItems: ISideBarItems[] = useMemo(() => {
    const items: ISideBarItems[] = [
      {
        key: routers.flightSearch.fullPath,
        icon: <AppIcon.Listing size={18} />,
        label: 'Tra cứu chuyến bay'
      },
      {
        key: routers.booking.fullPath,
        icon: <AppIcon.Plane size={18} />,
        label: 'Booking'
      },

      {
        key: routers.addFlight.fullPath,
        icon: <AppIcon.Plus size={18} />,
        authorities: ['ADMIN', 'EMPLOYEE'],
        label: 'Thêm chuyến bay'
      },
      {
        key: 'report',
        label: 'Báo cáo',
        icon: <AppIcon.Report size={18} />,
        authorities: ['ADMIN', 'EMPLOYEE'],
        children: [
          {
            key: routers.report.monthly.fullPath,
            label: 'Báo cáo tháng'
          },
          {
            key: routers.report.yearly.fullPath,
            label: 'Báo cáo năm'
          }
        ]
      },
      {
        type: 'divider'
      },
      {
        key: routers.settings.fullPath,
        label: 'Cài đặt',
        icon: <AppIcon.Setting size={18} />
      }
    ] as ISideBarItems[];

    // Filter items based on user roles
    return items.filter((item) => {
      if (!item?.authorities?.length) {
        return true;
      }

      const userRoles = Array.isArray(profile?.role) ? profile.role : [profile?.role];
      return item.authorities.some((authority) => userRoles.includes(authority));
    });
  }, [profile?.role]);

  const handleMenuClick = (key: string) => {
    setActiveKey(key);
    navigate(key);
  };

  return (
    <Sider style={siderStyle} collapsible theme='light'>
      <Menu
        selectedKeys={[activeKey]}
        onClick={({ key }) => handleMenuClick(key)}
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
