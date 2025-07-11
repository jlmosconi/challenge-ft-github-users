import {useCallback, useEffect, type FC} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import SafeArea from '@components/SafeArea';
import {t} from '@config/i18n';
import {
  clearUserList,
  fetchNextUsers,
  fetchSearchUsers,
  fetchUsers,
  selectIsFetching,
  selectUsersList,
} from '@store/slices/users';
import {mockUserList} from './data';
import InfiniteScrollList from '@components/InfiniteScrollList';
import UserItem from '@components/Users/Item';
import {selectFavoritesMap, toggleFavorite} from '@store/slices/favorites';
import ListFooter from '@components/Users/ListFooter';
import ListEmpty from '@components/Users/ListEmpty';
import SpacingBox from '@components/SpacingBox';
import SearchBox from '@components/Users/SearchBox';
import {Body2, TypographyText, Weight} from '@components/Text/TypographyText';

const HomeScreen: FC = () => {
  const list = useAppSelector(selectUsersList);
  const loading = useAppSelector(selectIsFetching);
  const favorites = useAppSelector(selectFavoritesMap);
  const dispatch = useAppDispatch();

  const getUserList = useCallback(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const handleOnFavoritePress = useCallback(
    (id: number) => {
      dispatch(toggleFavorite(id));
    },
    [dispatch],
  );

  const handleOnSearch = useCallback(
    (name: string) => {
      if (!name.trim()) {
        dispatch(clearUserList());
        getUserList();
        return;
      }
      dispatch(fetchSearchUsers({query: name}));
    },
    [dispatch, getUserList],
  );

  const handleOnRefresh = useCallback(() => {
    dispatch(clearUserList());
    getUserList();
  }, [getUserList, dispatch]);

  const handleFetchNextUsers = useCallback(() => {
    dispatch(fetchNextUsers());
  }, [dispatch]);

  const users = list;

  return (
    <SafeArea>
      <SpacingBox mt={2} mb={1}>
        <TypographyText type={Body2} weight={Weight.BOLD}>
          {t('home.title')}
        </TypographyText>
      </SpacingBox>
      <SpacingBox mb={3}>
        <SearchBox onSearch={handleOnSearch} placeholder={t('home.search_placeholder')} />
      </SpacingBox>
      <InfiniteScrollList
        data={users}
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
        ListFooterComponent={<ListFooter loading={!!loading} elementsToDisplay={!users?.length ? 5 : 1} />}
      />
    </SafeArea>
  );
};

export default HomeScreen;
