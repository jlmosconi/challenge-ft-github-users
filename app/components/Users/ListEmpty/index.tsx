import {type FC} from 'react';
import type {ListEmptyProps} from '@components/ListEmpty/types';
import {IconName} from '@components/Icon/icons';
import ListEmpty from '@components/ListEmpty';

interface UserListEmptyProps extends Partial<ListEmptyProps> {
  loading: boolean;
}

const UserListEmpty: FC<UserListEmptyProps> = ({iconName = IconName.Users, loading, text, ...rest}) => {
  if (loading) return null;

  return (
    <ListEmpty iconName={iconName} text={text || ''} iconTestID="noUsersImage" textTestID="noUsersTitle" {...rest} />
  );
};
export default UserListEmpty;
