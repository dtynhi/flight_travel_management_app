import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import routers from '~/routers/router';

function Forbidden() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Result
        status='403'
        title='403'
        subTitle='Sorry, you are not authorized to access this page.'
        extra={
          <>
            <Link to={routers.flightSearch.fullPath}>
              <Button type='primary'>Back Home</Button>
            </Link>
            <Link to={routers.auth.login.fullPath}>
              <Button type='link'>Log in</Button>
            </Link>
          </>
        }
      />
    </div>
  );
}

export default Forbidden;
