import { PopoverProps } from 'antd';
import { BsThreeDotsVertical } from 'react-icons/bs';
import React from 'react';

import { LoadingIcon } from '../Loading';
import { PopoverControlClose } from '../Popover';
import { IPopoverContentProps } from '../Popover/PopoverControlClose';

interface TableContextMenuButtonProps extends Omit<PopoverProps, 'children'> {
  loading?: boolean;
  children: (props: IPopoverContentProps) => React.ReactNode;
}

function TableContextMenuButton(props: TableContextMenuButtonProps) {
  const mergerProps: TableContextMenuButtonProps = {
    placement: 'bottomRight',
    title: null,
    arrow: false,
    trigger: ['click'],
    loading: false,
    mouseEnterDelay: 0.01,
    overlayInnerStyle: { padding: '6px 0' },
    ...props
  };

  if (mergerProps.loading) {
    return <LoadingIcon />;
  }

  return (
    <PopoverControlClose {...mergerProps} content={mergerProps.children}>
      <div className='flex justify-end cursor-pointer'>
        <div className='hover:bg-gray-200 p-1 rounded-md duration-75'>
          <BsThreeDotsVertical />
        </div>
      </div>
    </PopoverControlClose>
  );
}

export default TableContextMenuButton;
