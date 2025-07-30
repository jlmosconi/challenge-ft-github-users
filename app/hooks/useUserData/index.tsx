import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {fetchUser, selectHasErrorUser, selectIsFetchingUser, selectUser} from '@store/slices/users';

export const useUserData = (username: string) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);
  const isFetching = useAppSelector(selectIsFetchingUser);
  const hasError = useAppSelector(selectHasErrorUser);

  useEffect(() => {
    dispatch(fetchUser(username));
  }, [dispatch, username]);

  return {user, isFetching, hasError};
};
