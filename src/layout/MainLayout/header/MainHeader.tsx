import { Link } from 'react-router-dom';

import routers from '~/routers/router';
import HeaderAccountCenter from './HeaderAccountCenter';
import images from '~/assets/images';
import { Image } from 'antd';
import { Header } from 'antd/es/layout/layout';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  backgroundColor: 'white',
  padding: '0 18px',
  borderBottom: '1px solid #f0f0f0'
};

function MainHeader() {
  return (
    <Header style={headerStyle}>
      <div className='flex justify-between items-center'>
        <Link to={routers.home.fullPath}>
          <div className='flex items-center'>
            <Image preview={false} width={40} src={images.logo} />
            <span className='ms-2 font-semibold uppercase'>Flight Travel</span>
          </div>
        </Link>
        <div className='flex items-center justify-end'>
          <HeaderAccountCenter />
        </div>
      </div>
    </Header>
  );
}

export default MainHeader;
