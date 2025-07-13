import type {IUserListResponse, IUserResponse} from '@services/usersService/types';

/**
 * Generic type for representing boolean flags for different entities.
 */
type StatusFlags = {
  list: boolean;
  user: boolean;
};

export interface UsersState {
  list: IUserListResponse[];
  user?: IUserResponse;
  hasError: StatusFlags;
  isFetching: StatusFlags;
  isSearching: boolean;
}
