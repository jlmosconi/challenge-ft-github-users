import {type FC} from 'react';
import {ScrollView} from 'react-native';
import {type RouteProp} from '@react-navigation/native';
import {MainScreen, MainStack} from '@navigators/screenRoutes';
import {useFavoriteActions} from '@hooks/useFavoriteActions';
import {useUserData} from '@hooks/useUserData';
import {useLanguage} from '@hooks/useLanguage';
import SafeArea from '@components/SafeArea';
import {IconName} from '@components/Icon/icons';
import EmptyState from '@components/EmptyState';
import UserSkeleton from '@components/Users/UserSkeleton';
import UserDetails from './UserDetails';

type UserScreenProps = {route: RouteProp<MainStack, MainScreen.User>};

const UserScreen: FC<UserScreenProps> = ({route}) => {
  const {user, isFetching, hasError} = useUserData(route.params?.username || '');
  const {t} = useLanguage();
  const {isFavorite, handleOnFavoritePress} = useFavoriteActions();

  if (!user || isFetching) {
    return (
      <SafeArea>
        <UserSkeleton />
      </SafeArea>
    );
  }

  if (hasError) {
    return (
      <SafeArea>
        <EmptyState iconName={IconName.Error} text={t('user.error')} iconTestID="errorImage" textTestID="errorTitle" />
      </SafeArea>
    );
  }

  return (
    <SafeArea>
      <ScrollView>
        <UserDetails user={user} isFavorite={isFavorite(user.id)} onFavoritePress={handleOnFavoritePress} />
      </ScrollView>
    </SafeArea>
  );
};

export default UserScreen;
