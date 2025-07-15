import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {fetchUser, selectHasErrorUser, selectIsFetchingUser, selectUser} from '@store/slices/users';

export const useUserData = (username: string) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isFetching = useAppSelector(selectIsFetchingUser);
  const hasError = useAppSelector(selectHasErrorUser);

  useEffect(() => {
    if (!username || user?.login === username) return;

    dispatch(fetchUser(username));
  }, [dispatch, username, user?.login]);

  return {user, isFetching, hasError};
};
