import type {IUserListResponse, IUserResponse} from '@services/usersService/types';

export interface UsersState {
  list: IUserListResponse[];
  user?: IUserResponse;
  hasError?: boolean;
  isFetching: boolean;
  isSearching: boolean;
}
