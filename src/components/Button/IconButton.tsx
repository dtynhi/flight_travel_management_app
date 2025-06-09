import { Button, ButtonProps } from 'antd';
import AppIcon from '../Icon/AppIcon';

interface IconButtonProps extends ButtonProps {
  title?: string;
}
function IconButton(props: IconButtonProps) {
  return (
    <Button type='primary' {...props}>
      {props.title}
    </Button>
  );
}

IconButton.Plus = function (props: ButtonProps) {
  return <IconButton icon={<AppIcon.Plus />} title='Create' {...props} />;
};

IconButton.Filter = function (props: ButtonProps) {
  return <IconButton icon={<AppIcon.Filter />} title='Filter' {...props} />;
};

IconButton.Sync = function (props: ButtonProps) {
  return <IconButton icon={<AppIcon.Sync />} title='Sync' {...props} />;
};

IconButton.Edit = function (props: ButtonProps) {
  return <IconButton icon={<AppIcon.Edit />} title='Edit' {...props} />;
};

IconButton.Delete = function (props: ButtonProps) {
  return <IconButton title='Delete' icon={<AppIcon.Delete />} {...props} />;
};

IconButton.Download = function (props: ButtonProps) {
  return <IconButton title='Download' icon={<AppIcon.Download />} {...props} />;
};

export default IconButton;
