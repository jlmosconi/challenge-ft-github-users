import {type FC} from 'react';
import type {PressableProps} from 'react-native';
import type {IUserBase} from '@services/usersService/types';
import {TypographyText} from '@components/Text/TypographyText';
import FavoriteButton from '@components/FavoriteButton';
import UserAvatar from '@components/Users/UserAvatar';
import {Block, ColumnCenter, ColumnLeft, ColumnRight} from './styled';

interface UserItemProps extends Pick<IUserBase, 'login' | 'avatar_url'>, PressableProps {
  avatarSize?: number;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
  handleOnPress?: () => void;
  handleOnFavorite?: () => void;
}

const UserItem: FC<UserItemProps> = ({
  login,
  avatar_url,
  avatarSize = 4,
  isFavorite,
  handleOnPress,
  handleOnFavorite,
  ...props
}) => {
  return (
    <Block onPress={handleOnPress} {...props}>
      <ColumnLeft>
        <UserAvatar avatar_url={avatar_url} size={avatarSize} />
      </ColumnLeft>
      <ColumnCenter>
        <TypographyText>{login}</TypographyText>
      </ColumnCenter>
      <ColumnRight>
        <FavoriteButton isFavorite={isFavorite} onPress={handleOnFavorite} />
      </ColumnRight>
    </Block>
  );
};
export default UserItem;
