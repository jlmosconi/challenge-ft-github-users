import type {IUserListResponse} from '@services/usersService/types';

export interface UsersState {
  list: IUserListResponse[];
  isFetching: boolean;
  isSearching: boolean;
}
