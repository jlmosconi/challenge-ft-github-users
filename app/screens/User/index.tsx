import {useEffect, type FC} from 'react';
import {type RouteProp} from '@react-navigation/native';
import {useTheme} from 'styled-components/native';
import {t} from '@config/i18n';
import {MainScreen, MainStack} from '@navigators/screenRoutes';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useFavoriteActions} from '@hooks/useFavoriteActions';
import {fetchUser, selectHasErrorUser, selectIsFetchingUser, selectUser} from '@store/slices/users';
import SpacingBox from '@components/SpacingBox';
import UserAvatar from '@components/Users/UserAvatar';
import SafeArea from '@components/SafeArea';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';
import EmptyState from '@components/EmptyState';
import FavoriteButton from '@components/Favorite/FavoriteButton';
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
  AvatarContainer,
  FavoriteContainer,
} from './styled';
import UserSkeleton from '@components/Users/UserSkeleton';

type Props = {route: RouteProp<MainStack, MainScreen.User>};

const UserScreen: FC<Props> = ({route}) => {
  const {username} = route.params;

  const user = useAppSelector(selectUser);
  //   const isFetching = useAppSelector(selectIsFetchingUser);
  const isFetching = true;
  const hasError = useAppSelector(selectHasErrorUser);

  const dispatch = useAppDispatch();
  const theme = useTheme();
  const {isFavorite, handleOnFavoritePress} = useFavoriteActions();

  useEffect(() => {
    if (!username || user?.login === username) return;
    // Fetch user only if not already loaded or different user
    dispatch(fetchUser(username));
  }, [dispatch, username, user?.login]);

  if (!user || isFetching) {
    return (
      <SafeArea>
        {/* <View style={{padding: 16}}>
          <Text>Loading...</Text>
        </View> */}
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
        <AvatarContainer>
          <UserAvatar size={8} avatar_url={user.avatar_url} />
          <FavoriteContainer>
            <FavoriteButton
              iconSize={20}
              isFavorite={isFavorite(user.id)}
              onPress={() =>
                handleOnFavoritePress({
                  id: user.id,
                  login: user.login,
                  avatar_url: user.avatar_url,
                })
              }
            />
          </FavoriteContainer>
        </AvatarContainer>

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
