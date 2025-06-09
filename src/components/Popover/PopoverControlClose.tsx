import { Popover, PopoverProps } from 'antd';
import { useCallback, useState, ReactNode } from 'react';

export interface IPopoverContentProps {
  onClose: () => void;
}
interface IPopoverControlCloseProps extends Omit<PopoverProps, 'content'> {
  content: (props: IPopoverContentProps) => ReactNode;
}

const PopoverControlClose = ({ content, ...popoverProps }: IPopoverControlCloseProps) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpenChange = useCallback((visible: boolean) => setOpen(visible), []);

  return <Popover trigger={['click']} {...popoverProps} open={open} onOpenChange={handleOpenChange} content={content({ onClose: handleClose })}></Popover>;
};

export default PopoverControlClose;
