import {type FC} from 'react';
import type {EmptyStateProps} from '@components/EmptyState/types';
import {IconName} from '@components/Icon/icons';
import EmptyState from '@components/EmptyState';

interface UserListEmptyProps extends Partial<EmptyStateProps> {
  loading: boolean;
}

const UserListEmpty: FC<UserListEmptyProps> = ({iconName = IconName.Users, loading, text, ...rest}) => {
  if (loading) return null;

  return (
    <EmptyState iconName={iconName} text={text || ''} iconTestID="noUsersImage" textTestID="noUsersTitle" {...rest} />
  );
};
export default UserListEmpty;
