import {useAppSelector} from '@store/hooks';
import {useMemo} from 'react';
import {selectFavorites, selectFavoritesFilter} from '@store/slices/favorites';
import {sortUsers} from '@utils/users/sortUsers';

export const useFavoritesList = () => {
  const favorites = useAppSelector(selectFavorites);
  const filter = useAppSelector(selectFavoritesFilter);

  const favoritesList = useMemo(() => {
    const usersArray = Object.values(favorites);
    return sortUsers(usersArray, filter);
  }, [favorites, filter]);

  return {favoritesList, filter};
};
