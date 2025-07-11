import {useCallback, useEffect, type FC} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import SafeArea from '@components/SafeArea';
import {fetchUsers, isFetching, selectUsersList} from '@store/slices/users';
import {mockUserList} from './data';
import InfiniteScrollList from '@components/InfiniteScrollList';
import UserItem from '@components/Users/UserItem';

const HomeScreen: FC = () => {
  const list = useAppSelector(selectUsersList);
  const loading = useAppSelector(isFetching);
  const dispatch = useAppDispatch();

  // const getUserList = () => {
  //   console.log('mockUserList: ', mockUserList);
  //   // dispatch(fetchUsers());
  // };
  const getUserList = useCallback(() => {
    // dispatch(fetchUsers());
    console.log('mockUserList: ', mockUserList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    getUserList();
  }, [getUserList]);

  const handleOnFavoritePress = useCallback(() => {
    console.log('Favorite button pressed');
  }, []);

  return (
    <SafeArea>
      <InfiniteScrollList
        data={mockUserList}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <UserItem login={item.login} avatar_url={item.avatar_url} handleOnFavorite={handleOnFavoritePress} />
        )}
        fetchNextData={() => {
          console.log('fetchNextData called');
        }}
        refreshData={getUserList}
        isLoading={loading}
        // ListEmptyComponent={<ListEmpty loading={!!loading} text={t('home.empty')} />}
        // ListFooterComponent={
        //   <ListFooter loading={loading} emptyList={!data?.length} elementsToDisplay={!data?.length ? 5 : 1} />
        // }
      />
    </SafeArea>
  );
};

export default HomeScreen;
