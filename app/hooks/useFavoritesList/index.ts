import {useMemo, useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {selectFavorites, selectFavoritesFilter, setFilter} from '@store/slices/favorites';
import {sortUsers} from '@utils/users/sortUsers';
import {SortOption} from '@store/slices/favorites/types';

export const useFavoritesList = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const filter = useAppSelector(selectFavoritesFilter);

  const favoritesList = useMemo(() => {
    const usersArray = Object.values(favorites);
    return sortUsers(usersArray, filter);
  }, [favorites, filter]);

  const setFavoritesFilter = useCallback(
    (option: SortOption) => {
      dispatch(setFilter(option));
    },
    [dispatch],
  );

  return {
    favoritesList,
    filter,
    setFavoritesFilter,
  };
};
