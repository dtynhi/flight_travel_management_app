import { Outlet } from 'react-router-dom';
import MainHeader from './header/MainHeader';
import SideBar from './SideBar';
import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';

const contentStyle: React.CSSProperties = {
  minHeight: 'calc(100vh - 64px)',
  height: '100vh',
  overflowY: 'auto',
  padding: '0 14px',
  paddingTop: 20,
  paddingBottom: 64
};

const layoutStyle: React.CSSProperties = {
  overflow: 'hidden',
  width: 'calc(100% - 8px)',
  maxWidth: 'calc(100% - 8px)',
  height: '100vh'
};

function MainLayout({ noneLayout = false }: { noneLayout?: boolean }) {
  if (noneLayout) {
    return <Outlet />;
  }

  return (
    <Layout style={layoutStyle}>
      <MainHeader />
      <Layout>
        <SideBar />
        <Content style={contentStyle}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
