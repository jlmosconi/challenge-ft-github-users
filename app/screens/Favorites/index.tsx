import {useCallback, useMemo, type FC} from 'react';
import {t} from '@config/i18n';
import {selectFavorites, toggleFavorite} from '@store/slices/favorites';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {FavoriteUser} from '@store/slices/favorites/types';
import ScrollList from '@components/ScrollList';
import SafeArea from '@components/SafeArea';
import ListEmpty from '@components/ListEmpty';
import {IconName} from '@components/Icon/icons';
import RenderItem from '@components/Users/RenderItem';

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

  const renderItem = useCallback(
    ({item, index}: {item: FavoriteUser; index: number}) => (
      <RenderItem
        user={item}
        isFavorite={!!favorites[item.id]}
        onFavoritePress={handleOnFavoritePress}
        animate={true}
        index={index}
      />
    ),
    [handleOnFavoritePress, favorites],
  );

  return (
    <SafeArea>
      <ScrollList
        data={favoritesList}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <ListEmpty
            iconName={IconName.StarFilled}
            text={t('favorites.empty')}
            iconTestID="noFavoritesImage"
            textTestID="noFavoritesTitle"
          />
        }
      />
    </SafeArea>
  );
};

export default FavoritesScreen;
