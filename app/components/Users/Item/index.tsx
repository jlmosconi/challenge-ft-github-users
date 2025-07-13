import {type FC} from 'react';
import type {IUserBase} from '@services/usersService/types';
import {TypographyText} from '@components/Text/TypographyText';
import FavoriteButton from '@components/FavoriteButton';
import UserAvatar from '@components/Users/UserAvatar';
import {Block, ColumnCenter, ColumnLeft, ColumnRight} from './styled';

interface UserItem extends Pick<IUserBase, 'login' | 'avatar_url'> {
  avatarSize?: number;
  isFavorite?: boolean;
  showFavoriteButton?: boolean;
  handleOnPress?: () => void;
  handleOnFavorite?: () => void;
}

const UserItem: FC<UserItem> = ({login, avatar_url, avatarSize = 4, isFavorite, handleOnPress, handleOnFavorite}) => {
  return (
    <Block onPress={handleOnPress}>
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
