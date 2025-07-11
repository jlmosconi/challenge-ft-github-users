import {type FC} from 'react';
import type {IUserBase} from '@services/usersService/types';
import {TypographyText} from '@components/Text/TypographyText';
import {Block, ColumnCenter, ColumnLeft, ColumnRight, ColumnRightContainer} from './styled';
import UserAvatar from '../UserAvatar';

interface UserItem extends Pick<IUserBase, 'login' | 'avatar_url'> {
  avatarSize?: number;
}

const UserItem: FC<UserItem> = ({login, avatar_url, avatarSize = 4}) => {
  return (
    <Block>
      <ColumnLeft>
        <UserAvatar avatar_url={avatar_url} size={avatarSize} />
      </ColumnLeft>
      <ColumnCenter>
        <TypographyText>{login}</TypographyText>
      </ColumnCenter>
      <ColumnRight>
        <ColumnRightContainer>{/* <TypographyText>{item.id}</TypographyText> */}</ColumnRightContainer>
      </ColumnRight>
    </Block>
  );
};
export default UserItem;
