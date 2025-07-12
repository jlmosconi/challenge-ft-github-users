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
import {selectFavorites, toggleFavorite} from '@store/slices/favorites';
import ListFooter from '@components/Users/ListFooter';
import ListEmpty from '@components/Users/ListEmpty';
import SpacingBox from '@components/SpacingBox';
import SearchBox from '@components/Users/SearchBox';
import {Body2, TypographyText, Weight} from '@components/Text/TypographyText';
import {FavoriteUser} from '@store/slices/favorites/types';

const HomeScreen: FC = () => {
  const userList = useAppSelector(selectUsersList);
  const loading = useAppSelector(selectIsFetching);
  const favorites = useAppSelector(selectFavorites);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOnFavoritePress = useCallback(
    (user: FavoriteUser) => {
      dispatch(toggleFavorite(user));
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
