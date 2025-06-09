import { Skeleton } from 'antd';
import { SkeletonInputProps } from 'antd/es/skeleton/Input';

interface ISkeletonParagraphProps {
  lines?: number;
  lineClassName?: string;
  className?: string;
  spacing?: number;
  lineProps?: SkeletonInputProps;
}

function SkeletonParagraph({ lines = 1, lineClassName = '!w-full', className = '', spacing = 4, lineProps = {} }: ISkeletonParagraphProps) {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton.Input block key={index} active className={lineClassName} style={{ marginTop: spacing, marginBottom: spacing }} {...lineProps} />
      ))}
    </div>
  );
}

export default SkeletonParagraph;
