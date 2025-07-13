import {useEffect, type FC} from 'react';
import {type RouteProp} from '@react-navigation/native';
import {MainScreen, MainStack} from '@navigators/screenRoutes';
import {Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {fetchUser, selectUser} from '@store/slices/users';
import SpacingBox from '@components/SpacingBox';
import UserAvatar from '@components/Users/UserAvatar';
import {Body1, TypographyText, Weight} from '@components/Text/TypographyText';
import {InfoContainer} from './styled';
import SafeArea from '@components/SafeArea';

type Props = {route: RouteProp<MainStack, MainScreen.User>};

const UserScreen: FC<Props> = ({route}) => {
  const {username} = route.params;
  console.log('UserScreen route params:', route.params);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!username || user?.login === username) return;
    dispatch(fetchUser(username));
  }, [dispatch, username, user]);

  if (!user) {
    return (
      <>
        <Text>Loading...</Text>
      </>
    );
  }

  return (
    <SafeArea>
      <InfoContainer>
        <UserAvatar size={8} avatar_url={user.avatar_url} />

        <TypographyText type={Body1} weight={Weight.BOLD}>
          {user.name || user.login}
        </TypographyText>

        <TypographyText>{user.bio}</TypographyText>
      </InfoContainer>
    </SafeArea>
  );
};
export default UserScreen;
