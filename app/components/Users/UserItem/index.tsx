import {type FC} from 'react';
import type {IUserBase} from '@services/usersService/types';
import {TypographyText} from '@components/Text/TypographyText';
import {Block, ColumnCenter, ColumnLeft, ColumnRight} from './styled';
import UserAvatar from '../UserAvatar';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';
import {useTheme} from 'styled-components/native';

interface UserItem extends Pick<IUserBase, 'login' | 'avatar_url'> {
  avatarSize?: number;
}

const UserItem: FC<UserItem> = ({login, avatar_url, avatarSize = 4}) => {
  const theme = useTheme();
  return (
    <Block>
      <ColumnLeft>
        <UserAvatar avatar_url={avatar_url} size={avatarSize} />
      </ColumnLeft>
      <ColumnCenter>
        <TypographyText>{login}</TypographyText>
      </ColumnCenter>
      <ColumnRight>
        <SpecificSizeIcon size={24} name={IconName.StarEmpty} color={theme.colors.grey.dark} />
      </ColumnRight>
    </Block>
  );
};
export default UserItem;
