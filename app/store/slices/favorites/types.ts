import type {IUserBase} from '@services/usersService/types';
export type FavoriteUser = Pick<IUserBase, 'id' | 'login' | 'avatar_url'>;

export interface FavoritesState {
  list: Record<FavoriteUser['id'], FavoriteUser>;
}
