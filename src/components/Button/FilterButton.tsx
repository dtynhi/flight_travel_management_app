import clsx from 'clsx';
import { Button, Divider } from 'antd';
import { useCallback } from 'react';

import { PopoverControlClose } from '../Popover';
import useClearFilter from '~/hooks/useClearFilter';
import { commonUtil } from '~/utils';
import { MarketplaceEnum } from '~/constant/app.constant';
import IconButton from './IconButton';

interface IFilterButtonProps {
  onApplyFilter?: () => void;
  onClearFilter?: () => void;
  children?: React.ReactNode;
  className?: string;
  clearPath: string;
}

function FilterButton({ onApplyFilter, onClearFilter, children, clearPath, className }: IFilterButtonProps) {
  const { clearFilter } = useClearFilter();

  const handleReset = useCallback(() => {
    if (onClearFilter) {
      onClearFilter();
      return;
    }
    clearFilter({ pathName: clearPath, search: commonUtil.createSearchQuery({ markets: MarketplaceEnum.US }) });
  }, [clearFilter, onClearFilter, clearPath]);

  return (
    <PopoverControlClose
      arrow={false}
      placement='bottomRight'
      content={({ onClose }) => {
        return (
          <div className={clsx('!min-w-[360px]', className)}>
            {children}
            <Divider className='!py-1 !my-1' />
            <div className='flex items-center justify-end gap-1'>
              <Button
                onClick={() => {
                  onClose();
                  handleReset();
                }}
                type='default'
              >
                Clear
              </Button>

              <Button
                type='primary'
                onClick={() => {
                  onClose();
                  onApplyFilter?.();
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        );
      }}
    >
      <div>
        <IconButton.Filter />
      </div>
    </PopoverControlClose>
  );
}

export default FilterButton;
