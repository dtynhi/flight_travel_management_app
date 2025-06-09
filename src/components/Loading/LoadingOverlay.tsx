import { Spin } from 'antd';
import clsx from 'clsx';

type LoadingOverlayProps = {
  loading?: boolean;
  tooltip?: string;
  className?: string;
};
function LoadingOverlay({ loading = false, tooltip = 'Loading...', className = '' }: LoadingOverlayProps) {
  const classes = clsx('absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center bg-gray-300/80 z-50 ', className, {
    hidden: !loading
  });
  return (
    <div className={classes}>
      <Spin size='large' tip={tooltip}>
        <div
          style={{
            padding: 50,
            background: 'white',
            borderRadius: 4
          }}
        />
      </Spin>
    </div>
  );
}

export default LoadingOverlay;
