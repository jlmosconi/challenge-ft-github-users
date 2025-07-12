import {useCallback, useMemo, type FC} from 'react';
import SafeArea from '@components/SafeArea';
import {selectFavorites, toggleFavorite} from '@store/slices/favorites';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import InfiniteScrollList from '@components/InfiniteScrollList';
import UserItem from '@components/Users/Item';
import {FavoriteUser} from '@store/slices/favorites/types';
import ListEmpty from '@components/ListEmpty';
import {IconName} from '@components/Icon/icons';
import {t} from '@config/i18n';

const FavoritesScreen: FC = () => {
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  // transform the favorites object into an array for rendering, and memoize it for performance
  // this avoids unnecessary recalculations on every render
  const favoritesList = useMemo(() => Object.values(favorites), [favorites]);

  const handleOnFavoritePress = useCallback(
    (user: FavoriteUser) => {
      dispatch(toggleFavorite(user));
    },
    [dispatch],
  );

  if (!favoritesList.length) {
    return (
      <SafeArea>
        <ListEmpty
          iconName={IconName.StarFilled}
          text={t('favorites.empty')}
          iconTestID="noFavoritesImage"
          textTestID="noFavoritesTitle"
        />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <InfiniteScrollList
        data={favoritesList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item: {id, login, avatar_url}}) => (
          <UserItem
            login={login}
            avatar_url={avatar_url}
            handleOnFavorite={() =>
              handleOnFavoritePress({
                id,
                login,
                avatar_url,
              })
            }
            isFavorite={!!favorites[id]}
          />
        )}
      />
    </SafeArea>
  );
};

export default FavoritesScreen;
