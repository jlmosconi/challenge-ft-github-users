import {type FC} from 'react';
import {type RouteProp} from '@react-navigation/native';
import {useTheme} from 'styled-components/native';
import {MainScreen, MainStack} from '@navigators/screenRoutes';
import {useFavoriteActions} from '@hooks/useFavoriteActions';
import {useUserData} from '@hooks/useUserData';
import {useLanguage} from '@hooks/useLanguage';
import SpacingBox from '@components/SpacingBox';
import UserAvatar from '@components/Users/UserAvatar';
import SafeArea from '@components/SafeArea';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconName} from '@components/Icon/icons';
import EmptyState from '@components/EmptyState';
import FavoriteButton from '@components/FavoriteButton';
import UserSkeleton from '@components/Users/UserSkeleton';
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

type Props = {route: RouteProp<MainStack, MainScreen.User>};

const UserScreen: FC<Props> = ({route}) => {
  const {user, isFetching, hasError} = useUserData(route.params?.username || '');
  const theme = useTheme();
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

  const userBoxes = [
    {title: t('user.respos'), value: user.public_repos},
    {title: t('user.followers'), value: user.followers},
    {title: t('user.following'), value: user.following},
  ];

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
          {userBoxes.map(box => (
            <InfoBox key={box.title}>
              <InfoBoxValue>{box.value}</InfoBoxValue>
              <InfoBoxTitle>{box.title}</InfoBoxTitle>
            </InfoBox>
          ))}
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
