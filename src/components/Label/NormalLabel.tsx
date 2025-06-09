import clsx from 'clsx';

interface INormalLabelProps {
  label?: string;
  value?: string;
  hiddenOnEmpty?: boolean;
  className?: string;
}

function NormalLabel({ label, value, hiddenOnEmpty = true, className }: INormalLabelProps) {
  if (hiddenOnEmpty && !value) {
    return null;
  }
  return (
    <div className={clsx('flex items-center gap-1', className)}>
      {label || ''} {value || ''}
    </div>
  );
}

export default NormalLabel;
