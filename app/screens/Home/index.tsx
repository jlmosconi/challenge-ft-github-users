import {useCallback, useEffect, type FC} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import SafeArea from '@components/SafeArea';
import {t} from '@config/i18n';
import {
  fetchNextUsers,
  fetchSearchUsers,
  fetchUsers,
  reloadUsers,
  selectHasErrorList,
  selectIsFetchingList,
  selectIsSearching,
  selectUsersList,
} from '@store/slices/users';
import {selectFavorites} from '@store/slices/favorites';
import type {FavoriteUser} from '@store/slices/favorites/types';
import ScrollList from '@components/ScrollList';
import ListFooter from '@components/Users/ListFooter';
import ListEmpty from '@components/Users/ListEmpty';
import SpacingBox from '@components/SpacingBox';
import SearchBox from '@components/Users/SearchBox';
import {Body2, TypographyText, Weight} from '@components/Text/TypographyText';
import UserRenderItem from '@components/Users/RenderItem';
import EmptyState from '@components/EmptyState';
import {IconName} from '@components/Icon/icons';
import {MainScreen} from '@navigators/screenRoutes';
import {navigate} from '@utils/navigation';
import {useFavoriteActions} from '@hooks/useFavoriteActions';

const HomeScreen: FC = () => {
  const userList = useAppSelector(selectUsersList);
  const loading = useAppSelector(selectIsFetchingList);
  const favorites = useAppSelector(selectFavorites);
  const isSearching = useAppSelector(selectIsSearching);
  const hasError = useAppSelector(selectHasErrorList);

  const dispatch = useAppDispatch();
  const {handleOnFavoritePress} = useFavoriteActions();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOnSearch = useCallback(
    (name: string) => {
      if (!name.trim()) {
        return dispatch(reloadUsers());
      }
      dispatch(fetchSearchUsers({query: name}));
    },
    [dispatch],
  );

  const handleOnRefresh = useCallback(() => {
    dispatch(reloadUsers());
  }, [dispatch]);

  const handleFetchNextUsers = useCallback(() => {
    dispatch(fetchNextUsers());
  }, [dispatch]);

  const navigateToUserScreen = useCallback((username: string) => navigate(MainScreen.User, {username}), []);

  const renderItem = useCallback(
    ({item}: {item: FavoriteUser}) => (
      <UserRenderItem
        user={item}
        isFavorite={!!favorites[item.id]}
        onPress={() => navigateToUserScreen(item.login)}
        onFavoritePress={handleOnFavoritePress}
      />
    ),
    [favorites, handleOnFavoritePress, navigateToUserScreen],
  );

  return (
    <SafeArea>
      <SpacingBox mb={1}>
        <TypographyText type={Body2} weight={Weight.BOLD} testID="homeTitle">
          {t('home.title')}
        </TypographyText>
      </SpacingBox>
      <SpacingBox mb={3}>
        <SearchBox
          onSearch={handleOnSearch}
          placeholder={t('home.search_placeholder')}
          isSearching={isSearching && loading}
        />
      </SpacingBox>

      {hasError ? (
        <EmptyState iconName={IconName.Error} text={t('home.error')} iconTestID="errorImage" textTestID="errorTitle" />
      ) : (
        <ScrollList
          data={userList}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          fetchNextData={handleFetchNextUsers}
          refreshData={handleOnRefresh}
          isLoading={loading}
          ListEmptyComponent={<ListEmpty loading={!!loading} text={t('home.empty')} />}
          ListFooterComponent={<ListFooter loading={!!loading} elementsToDisplay={!userList?.length ? 5 : 1} />}
        />
      )}
    </SafeArea>
  );
};

export default HomeScreen;
