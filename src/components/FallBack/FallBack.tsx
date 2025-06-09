import { Spin } from 'antd';

function FallBack() {
  return (
    <div className='flex justify-center py-32'>
      <Spin size='large' />
    </div>
  );
}

export default FallBack;
