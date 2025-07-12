import {useCallback, useMemo, useRef, type FC} from 'react';
import {t} from '@config/i18n';
import type {BottomSheetModal} from '@gorhom/bottom-sheet';
import {selectFavorites, toggleFavorite} from '@store/slices/favorites';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {FavoriteUser} from '@store/slices/favorites/types';
import ScrollList from '@components/ScrollList';
import SafeArea from '@components/SafeArea';
import ListEmpty from '@components/ListEmpty';
import {IconName} from '@components/Icon/icons';
import RenderItem from '@components/Users/RenderItem';
import {Pressable, Text} from 'react-native';
import BottomModal from '@components/BottomModal';

const FavoritesScreen: FC = () => {
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

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
        index={index}
        animate
      />
    ),
    [handleOnFavoritePress, favorites],
  );

  return (
    <>
      <SafeArea>
        <Pressable onPress={handlePresentModalPress}>
          <Text>Open Bottom Sheet</Text>
        </Pressable>
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
      <BottomModal ref={bottomSheetModalRef}>
        <Text>Awesome 🎉</Text>
      </BottomModal>
    </>
  );
};

export default FavoritesScreen;
