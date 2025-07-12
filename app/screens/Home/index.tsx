import {useCallback, useEffect, type FC} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import SafeArea from '@components/SafeArea';
import {t} from '@config/i18n';
import {
  fetchNextUsers,
  fetchSearchUsers,
  fetchUsers,
  reloadUsers,
  selectIsFetching,
  selectUsersList,
} from '@store/slices/users';
import InfiniteScrollList from '@components/InfiniteScrollList';
import UserItem from '@components/Users/Item';
import {selectFavoritesMap, toggleFavorite} from '@store/slices/favorites';
import ListFooter from '@components/Users/ListFooter';
import ListEmpty from '@components/Users/ListEmpty';
import SpacingBox from '@components/SpacingBox';
import SearchBox from '@components/Users/SearchBox';
import {Body2, TypographyText, Weight} from '@components/Text/TypographyText';

const HomeScreen: FC = () => {
  const userList = useAppSelector(selectUsersList);
  const loading = useAppSelector(selectIsFetching);
  const favorites = useAppSelector(selectFavoritesMap);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOnFavoritePress = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch],
  );

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

  return (
    <SafeArea>
      <SpacingBox mb={1}>
        <TypographyText type={Body2} weight={Weight.BOLD}>
          {t('home.title')}
        </TypographyText>
      </SpacingBox>
      <SpacingBox mb={3}>
        <SearchBox onSearch={handleOnSearch} placeholder={t('home.search_placeholder')} />
      </SpacingBox>
      <InfiniteScrollList
        data={userList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <UserItem
            login={item.login}
            avatar_url={item.avatar_url}
            handleOnFavorite={() => handleOnFavoritePress(item.id)}
            isFavorite={favorites.has(item.id)}
          />
        )}
        fetchNextData={handleFetchNextUsers}
        refreshData={handleOnRefresh}
        isLoading={loading}
        ListEmptyComponent={<ListEmpty loading={!!loading} text={t('home.empty')} />}
        ListFooterComponent={<ListFooter loading={!!loading} elementsToDisplay={!userList?.length ? 5 : 1} />}
      />
    </SafeArea>
  );
};

export default HomeScreen;
