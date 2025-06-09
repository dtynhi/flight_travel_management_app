import { Avatar, AvatarProps } from 'antd';
import { commonUtil } from '~/utils';

interface UserAvatarProps extends AvatarProps {
  name?: string;
}

function UserAvatar(props: UserAvatarProps) {
  const defaultProps: UserAvatarProps = {
    shape: 'square',
    size: 28,
    ...props,
    src: props?.src,
    name: props?.name || ''
  };

  if (!defaultProps.src) {
    const { character, color } = commonUtil.getColorByName(defaultProps.name as string);
    return (
      <Avatar {...defaultProps} style={{ ...defaultProps.style, backgroundColor: color, verticalAlign: 'middle' }}>
        {character}
      </Avatar>
    );
  }

  return <Avatar {...defaultProps} />;
}

export default UserAvatar;
