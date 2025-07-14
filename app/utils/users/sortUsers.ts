import {FavoriteUser, type SortOption} from '@store/slices/favorites/types';

export function sortUsers(users: FavoriteUser[], sortBy: SortOption): FavoriteUser[] {
  const sorted = [...users];

  switch (sortBy) {
    case 'name-asc':
      sorted.sort((a, b) => a.login.localeCompare(b.login));
      break;
    case 'name-desc':
      sorted.sort((a, b) => b.login.localeCompare(a.login));
      break;
    default:
      sorted.sort((a, b) => a.id - b.id);
      break;
  }

  return sorted;
}
