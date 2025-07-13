import {useEffect, type FC} from 'react';
import {type RouteProp} from '@react-navigation/native';
import {MainScreen, MainStack} from '@navigators/screenRoutes';
import {Text} from 'react-native';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {fetchUser, selectIsFetchingUser, selectUser} from '@store/slices/users';
import SpacingBox from '@components/SpacingBox';
import UserAvatar from '@components/Users/UserAvatar';
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
import SafeArea from '@components/SafeArea';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';
import {useTheme} from 'styled-components/native';

type Props = {route: RouteProp<MainStack, MainScreen.User>};

const UserScreen: FC<Props> = ({route}) => {
  const {username} = route.params;
  console.log('UserScreen route params:', route.params);
  const user = useAppSelector(selectUser);
  const isFetching = useAppSelector(selectIsFetchingUser);

  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    if (!username || user?.login === username) return;
    dispatch(fetchUser(username));
  }, [dispatch, username, user]);

  if (!user || isFetching) {
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
            <InfoBoxTitle>Repositorios</InfoBoxTitle>
          </InfoBox>
          <InfoBox>
            <InfoBoxValue>{user.followers}</InfoBoxValue>
            <InfoBoxTitle>Seguidores</InfoBoxTitle>
          </InfoBox>
          <InfoBox>
            <InfoBoxValue>{user.following}</InfoBoxValue>
            <InfoBoxTitle>Siguiendo</InfoBoxTitle>
          </InfoBox>
        </BoxesContainer>

        <DataListContainer mv={2}>
          {user.company && (
            <DataListItem>
              <SpecificSizeIcon name={IconName.Company} size={18} color={theme.colors.grey.dark} />
              <InfoListText numberOfLines={1}>{user.company}</InfoListText>
            </DataListItem>
          )}
          {user.email && (
            <DataListItem>
              <SpecificSizeIcon name={IconName.Email} size={18} color={theme.colors.grey.dark} />
              <InfoListText numberOfLines={1}>{user.email}</InfoListText>
            </DataListItem>
          )}
          {user.location && (
            <DataListItem>
              <SpecificSizeIcon name={IconName.Place} size={18} color={theme.colors.grey.dark} />
              <InfoListText numberOfLines={1}>{user.location}</InfoListText>
            </DataListItem>
          )}
          {user.blog && (
            <DataListItem>
              <SpecificSizeIcon name={IconName.Link} size={18} color={theme.colors.grey.dark} />
              <InfoListText numberOfLines={1}>{user.blog}</InfoListText>
            </DataListItem>
          )}
          {user.twitter_username && (
            <DataListItem>
              <SpecificSizeIcon name={IconName.X} size={18} color={theme.colors.grey.dark} />
              <InfoListText numberOfLines={1}>{user.twitter_username}</InfoListText>
            </DataListItem>
          )}
        </DataListContainer>
      </InfoContainer>
    </SafeArea>
  );
};
export default UserScreen;
