import clsx from 'clsx';

function Overlay({ className = '' }: { className?: string }) {
  return <div className={clsx('absolute top-0 left-0 right-0 bottom-0 bg-gray-50/50', className)}></div>;
}

export default Overlay;
