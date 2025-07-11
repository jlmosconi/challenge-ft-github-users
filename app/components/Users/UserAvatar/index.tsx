import {type FC} from 'react';
import {useTheme} from 'styled-components/native';
import type {IUserBase} from '@services/usersService/types';
import {AvatarWrapper, ProfileDefault, StyledImage} from './styled';

interface UserAvatarProps extends Pick<IUserBase, 'avatar_url'> {
  size: number;
}

const UserAvatar: FC<UserAvatarProps> = ({avatar_url, size = 4}) => {
  const theme = useTheme();
  const bgColor = theme.colors.grey.light;

  return (
    <AvatarWrapper size={size} backgroundColor={bgColor}>
      <StyledImage source={{uri: avatar_url}} fallback={<ProfileDefault />} />
    </AvatarWrapper>
  );
};
export default UserAvatar;
