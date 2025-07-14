import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {selectFavorites, toggleFavorite} from '@store/slices/favorites';
import type {FavoriteUser} from '@store/slices/favorites/types';

/**
 * Provides actions and selectors related to favorite users.
 * Centralizes logic for toggling favorites and checking if a user is marked as favorite.
 * Ready to grow for additional logic like analytics or side effects in the future.
 */
export const useFavoriteActions = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);

  const handleOnFavoritePress = useCallback(
    (user: FavoriteUser) => {
      dispatch(
        toggleFavorite({
          id: user.id,
          login: user.login,
          avatar_url: user.avatar_url,
        }),
      );
    },
    [dispatch],
  );

  const isFavorite = useCallback((id: FavoriteUser['id']) => !!favorites[id], [favorites]);

  return {
    handleOnFavoritePress,
    isFavorite,
  };
};
