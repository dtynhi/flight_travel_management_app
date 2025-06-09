import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
import useQueryParams from '~/hooks/useQueryParams';
import routers from '~/routers/router';

function NotFound() {
  const queryParams = useQueryParams();
  const title = queryParams?.message || 'Sorry, the page you visited does not exist.';
  return (
    <div className='flex h-screen items-center justify-center'>
      <Result
        status='404'
        title='404'
        subTitle={title}
        extra={
          <Link to={routers.home.fullPath}>
            <Button type='primary'>Back Home</Button>
          </Link>
        }
      />
    </div>
  );
}

export default NotFound;
