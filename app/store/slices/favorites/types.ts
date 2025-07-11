import type {IUserBase} from '@services/usersService/types';

export type FavoriteId = IUserBase['id'];

export interface FavoritesState {
  list: Record<FavoriteId, true>;
}
