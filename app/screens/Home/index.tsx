import {useEffect, type FC} from 'react';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import SafeArea from '@components/SafeArea';
import {fetchUsers, isFetching, selectUsersList} from '@store/slices/users';

const HomeScreen: FC = () => {
  const list = useAppSelector(selectUsersList);
  const loading = useAppSelector(isFetching);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(fetchUsers());
  }, [dispatch]);

  return <SafeArea></SafeArea>;
};

export default HomeScreen;
