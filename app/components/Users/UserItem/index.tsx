import {type FC} from 'react';
import type {IUserBase} from '@services/usersService/types';
import {TypographyText} from '@components/Text/TypographyText';
import {Block, ColumnCenter, ColumnLeft, ColumnRight} from './styled';
import UserAvatar from '../UserAvatar';
import FavoriteButton from '@components/Favorite/FavoriteButton';

interface UserItem extends Pick<IUserBase, 'login' | 'avatar_url'> {
  avatarSize?: number;
  showFavoriteButton?: boolean;
  handleOnFavorite?: () => void;
}

const UserItem: FC<UserItem> = ({login, avatar_url, avatarSize = 4, showFavoriteButton = true, handleOnFavorite}) => {
  return (
    <Block>
      <ColumnLeft>
        <UserAvatar avatar_url={avatar_url} size={avatarSize} />
      </ColumnLeft>
      <ColumnCenter>
        <TypographyText>{login}</TypographyText>
      </ColumnCenter>
      <ColumnRight>{showFavoriteButton && <FavoriteButton isFavorite={true} onPress={handleOnFavorite} />}</ColumnRight>
    </Block>
  );
};
export default UserItem;
