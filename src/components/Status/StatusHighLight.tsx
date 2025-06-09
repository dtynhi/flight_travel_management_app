import clsx from 'clsx';

const defaultStatus = {
  draft: {
    color: '#64748b'
  },
  active: {
    color: '#22c55e'
  },
  pending: {
    color: '#f59e0b'
  },
  deleted: {
    color: '#ef4444'
  }
};

interface StatusHighLightProps {
  className?: string;
  status: keyof typeof defaultStatus;
}

function StatusHighLight({ className = '', status }: StatusHighLightProps) {
  const classes = clsx('rounded-full px-2 py-1 text-md font-semibold uppercase', className);
  return (
    <div className={classes} style={{ color: defaultStatus[status].color }}>
      {status}
    </div>
  );
}

export default StatusHighLight;
