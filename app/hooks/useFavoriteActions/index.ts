import {useCallback} from 'react';
import {useAppDispatch} from '@store/hooks';
import {toggleFavorite} from '@store/slices/favorites';
import type {FavoriteUser} from '@store/slices/favorites/types';

/**
 * Provides actions related to favorite users.
 * Ready to grow for additional logic like analytics
 * or side effects in the future.
 */
export const useFavoriteActions = () => {
  const dispatch = useAppDispatch();

  const handleOnFavoritePress = useCallback(
    (user: FavoriteUser) => {
      dispatch(toggleFavorite(user));
    },
    [dispatch],
  );

  return {
    handleOnFavoritePress,
  };
};
