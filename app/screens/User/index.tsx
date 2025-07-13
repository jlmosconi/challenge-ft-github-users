import {useEffect, type FC} from 'react';
import {Text, View} from 'react-native';
import {type RouteProp} from '@react-navigation/native';
import {MainScreen, MainStack} from '@navigators/screenRoutes';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {fetchUser, selectIsFetchingUser, selectUser} from '@store/slices/users';
import SpacingBox from '@components/SpacingBox';
import UserAvatar from '@components/Users/UserAvatar';
import SafeArea from '@components/SafeArea';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';
import {useTheme} from 'styled-components/native';
import {
  Bio,
  BoxesContainer,
  DataListItem,
  DataListContainer,
  InfoBox,
  InfoBoxTitle,
  InfoBoxValue,
  InfoContainer,
  InfoListText,
  Login,
  NameContainer,
  UserName,
} from './styled';
import {t} from '@config/i18n';

type Props = {route: RouteProp<MainStack, MainScreen.User>};

const UserScreen: FC<Props> = ({route}) => {
  const {username} = route.params;

  const user = useAppSelector(selectUser);
  const isFetching = useAppSelector(selectIsFetchingUser);

  const dispatch = useAppDispatch();
  const theme = useTheme();

  // Fetch user only if not already loaded or different user
  useEffect(() => {
    if (!username || user?.login === username) return;
    dispatch(fetchUser(username));
  }, [dispatch, username, user]);

  if (!user || isFetching) {
    return (
      <SafeArea>
        <View style={{padding: 16}}>
          <Text>Loading...</Text>
        </View>
      </SafeArea>
    );
  }

  const userInfoFields = [
    {icon: IconName.Company, value: user.company},
    {icon: IconName.Email, value: user.email},
    {icon: IconName.Place, value: user.location},
    {icon: IconName.Link, value: user.blog},
    {icon: IconName.X, value: user.twitter_username},
  ].filter(item => !!item.value);

  return (
    <SafeArea>
      <InfoContainer>
        <UserAvatar size={8} avatar_url={user.avatar_url} />

        <SpacingBox mb={1}>
          {user.name ? (
            <NameContainer>
              <UserName>{user.name}</UserName>
              <Login>{user.login}</Login>
            </NameContainer>
          ) : (
            <UserName>{user.login}</UserName>
          )}
        </SpacingBox>

        {user.bio && (
          <SpacingBox mb={0.5}>
            <Bio>{user.bio}</Bio>
          </SpacingBox>
        )}

        <BoxesContainer>
          <InfoBox>
            <InfoBoxValue>{user.public_repos}</InfoBoxValue>
            <InfoBoxTitle>{t('user.respos')}</InfoBoxTitle>
          </InfoBox>
          <InfoBox>
            <InfoBoxValue>{user.followers}</InfoBoxValue>
            <InfoBoxTitle>{t('user.followers')}</InfoBoxTitle>
          </InfoBox>
          <InfoBox>
            <InfoBoxValue>{user.following}</InfoBoxValue>
            <InfoBoxTitle>{t('user.following')}</InfoBoxTitle>
          </InfoBox>
        </BoxesContainer>

        {userInfoFields.length > 0 && (
          <DataListContainer mv={2}>
            {userInfoFields.map(({icon, value}) => (
              <DataListItem key={icon}>
                <SpecificSizeIcon name={icon} size={18} color={theme.colors.grey.dark} />
                <InfoListText numberOfLines={1}>{value}</InfoListText>
              </DataListItem>
            ))}
          </DataListContainer>
        )}
      </InfoContainer>
    </SafeArea>
  );
};

export default UserScreen;
