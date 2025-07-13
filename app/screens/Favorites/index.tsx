import {useCallback, useMemo, useRef, type FC} from 'react';
import type {BottomSheetModal} from '@gorhom/bottom-sheet';
import {selectFavorites, selectFavoritesFilter, setFilter} from '@store/slices/favorites';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {FavoriteUser, type SortOption} from '@store/slices/favorites/types';
import {t} from '@config/i18n';
import {sortUsers} from '@utils/users/sortUsers';
import {MainScreen} from '@navigators/screenRoutes';
import {navigate} from '@utils/navigation';
import {useFavoriteActions} from '@hooks/useFavoriteActions';
import ScrollList from '@components/ScrollList';
import SafeArea from '@components/SafeArea';
import ListEmpty from '@components/EmptyState';
import {IconName} from '@components/Icon/icons';
import RenderItem from '@components/Users/RenderItem';
import ListFilter from '@components/ListFilter';
import SpacingBox from '@components/SpacingBox';
import FilterModal from '@components/Users/FilterModal';

const FavoritesScreen: FC = () => {
  const favorites = useAppSelector(selectFavorites);
  const filter = useAppSelector(selectFavoritesFilter);

  const dispatch = useAppDispatch();
  const {handleOnFavoritePress} = useFavoriteActions();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSortSelection = useCallback(
    (option: SortOption) => {
      dispatch(setFilter(option));
      bottomSheetModalRef.current?.close();
    },
    [dispatch],
  );

  const favoritesList = useMemo(() => {
    const usersArray = Object.values(favorites);
    return sortUsers(usersArray, filter);
  }, [favorites, filter]);

  const navigateToUserScreen = useCallback((id: number) => navigate(MainScreen.User, {userId: id}), []);

  const renderItem = useCallback(
    ({item}: {item: FavoriteUser}) => (
      <RenderItem
        user={item}
        isFavorite={!!favorites[item.id]}
        animate
        onFavoritePress={handleOnFavoritePress}
        onPress={() => navigateToUserScreen(item.id)}
      />
    ),
    [favorites, handleOnFavoritePress, navigateToUserScreen],
  );

  return (
    <>
      <SafeArea>
        {!!favoritesList.length && (
          <SpacingBox mv={1}>
            <ListFilter onFilterPress={handlePresentModalPress} />
          </SpacingBox>
        )}

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
      <FilterModal ref={bottomSheetModalRef} onSortSelection={handleSortSelection} filter={filter} />
    </>
  );
};

export default FavoritesScreen;
