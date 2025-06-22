import { Button, ButtonProps } from 'antd';
import clsx from 'clsx';
import { omit } from 'lodash';
import AppIcon from '../Icon/AppIcon';

interface ITableActionButtonProps extends ButtonProps {
  hidden?: boolean;
  show?: boolean;
}

function TableActionButton(props: ITableActionButtonProps) {
  const mergerProps: ITableActionButtonProps = {
    className: clsx('!flex !justify-start !rounded-none min-w-[140px] w-full', props.className),
    type: 'text',
    ...props
  };
  if (props.hidden === true) return null;
  if (props.show === false) return null;
  return <Button {...mergerProps}></Button>;
}

TableActionButton.Delete = function (props: ITableActionButtonProps) {
  return (
    <TableActionButton {...omit(props, ['icon', 'children'])} icon={<AppIcon.Delete />}>
      {'Xóa'}
    </TableActionButton>
  );
};

TableActionButton.Edit = function (props: ITableActionButtonProps) {
  return (
    <TableActionButton {...omit(props, ['icon', 'children'])} icon={<AppIcon.Edit />}>
      {'Chỉnh sửa'}
    </TableActionButton>
  );
};

export default TableActionButton;
