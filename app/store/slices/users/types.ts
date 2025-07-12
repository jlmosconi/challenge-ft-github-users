import type {IUserListResponse} from '@services/usersService/types';

export interface UsersState {
  list: IUserListResponse[];
  hasError?: boolean;
  isFetching: boolean;
  isSearching: boolean;
}
