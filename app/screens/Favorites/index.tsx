import {useCallback, useRef, type FC} from 'react';
import type {BottomSheetModal} from '@gorhom/bottom-sheet';
import {setFilter} from '@store/slices/favorites';
import {useAppDispatch} from '@store/hooks';
import {FavoriteUser, type SortOption} from '@store/slices/favorites/types';
import {MainScreen} from '@navigators/screenRoutes';
import {navigate} from '@utils/navigation';
import {useLanguage} from '@hooks/useLanguage';
import {useFavoritesList} from '@hooks/useFavoritesList';
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
  const {favoritesList, filter} = useFavoritesList();
  const {t} = useLanguage();
  const {isFavorite, handleOnFavoritePress} = useFavoriteActions();

  const dispatch = useAppDispatch();

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

  const navigateToUserScreen = useCallback((username: string) => navigate(MainScreen.User, {username}), []);

  const renderItem = useCallback(
    ({item}: {item: FavoriteUser}) => (
      <RenderItem
        user={item}
        isFavorite={isFavorite(item.id)}
        onFavoritePress={handleOnFavoritePress}
        onPress={() => navigateToUserScreen(item.login)}
        animate
      />
    ),
    [handleOnFavoritePress, isFavorite, navigateToUserScreen],
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
