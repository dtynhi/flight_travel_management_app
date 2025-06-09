const customizeRequiredMark = (label: React.ReactNode, { required }: { required: boolean }) => (
  <>
    {label}
    {required && <span className='text-red-500 ms-1 font-bold'>*</span>}
  </>
);

export const requiredMarkRender = (className: string) => {
  return (label: React.ReactNode, { required }: { required: boolean }) => (
    <>
      <span className={className}>{label}</span>
      {required && <span className={'text-red-500 ms-1 font-bold'}>*</span>}
    </>
  );
};

export default customizeRequiredMark;
