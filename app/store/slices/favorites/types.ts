import type {IUserBase} from '@services/usersService/types';

export type FavoriteUser = Pick<IUserBase, 'id' | 'login' | 'avatar_url'>;
export type SortOption = 'name-asc' | 'name-desc' | 'id';

export interface FavoritesState {
  // Record is used instead of Map because Redux and its persistence
  // mechanisms don't serialize Map objects reliably.
  // A Map would be more efficient for lookups,
  // but JSON.stringify doesn't support it properly.
  list: Record<FavoriteUser['id'], FavoriteUser>;
  filter: SortOption;
}
