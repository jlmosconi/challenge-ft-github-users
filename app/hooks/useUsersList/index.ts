import {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
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

export const useUsersList = () => {
  const userList = useAppSelector(selectUsersList);
  const loading = useAppSelector(selectIsFetchingList);
  const isSearching = useAppSelector(selectIsSearching);
  const hasError = useAppSelector(selectHasErrorList);
  const dispatch = useAppDispatch();

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

  return {
    userList,
    loading,
    isSearching,
    hasError,
    handleOnSearch,
    handleOnRefresh,
    handleFetchNextUsers,
  };
};
