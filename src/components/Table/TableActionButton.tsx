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
  if (props.hidden === true) {
    return null;
  }
  if (props.show === false) {
    return null;
  }
  return <Button {...mergerProps}></Button>;
}

TableActionButton.Delete = function (props: ITableActionButtonProps) {
  return (
    <TableActionButton {...omit(props, ['icon, children'])} icon={<AppIcon.Delete />}>
      {props.children || 'Delete'}
    </TableActionButton>
  );
};

TableActionButton.Edit = function (props: ITableActionButtonProps) {
  return (
    <TableActionButton {...omit(props, ['icon, children'])} icon={<AppIcon.Edit />}>
      {props.children || 'Edit'}
    </TableActionButton>
  );
};

TableActionButton.Sync = function (props: ITableActionButtonProps) {
  return (
    <TableActionButton {...omit(props, ['icon, children'])} icon={<AppIcon.Sync />}>
      {props.children || 'Sync'}
    </TableActionButton>
  );
};

TableActionButton.Clone = function (props: ITableActionButtonProps) {
  return (
    <TableActionButton {...omit(props, ['icon, children'])} icon={<AppIcon.Clone />}>
      {props.children || 'Clone'}
    </TableActionButton>
  );
};

TableActionButton.Download = function (props: ITableActionButtonProps) {
  return (
    <TableActionButton {...omit(props, ['icon, children'])} icon={<AppIcon.Download />}>
      {props.children || 'Download'}
    </TableActionButton>
  );
};

TableActionButton.Share = function (props: ITableActionButtonProps) {
  return (
    <TableActionButton {...omit(props, ['icon, children'])} icon={<AppIcon.Share />}>
      {props.children || 'Share'}
    </TableActionButton>
  );
};

export default TableActionButton;
