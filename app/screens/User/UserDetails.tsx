import {type FC} from 'react';
import {useTheme} from 'styled-components/native';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import FavoriteButton from '@components/FavoriteButton';
import SpacingBox from '@components/SpacingBox';
import UserAvatar from '@components/Users/UserAvatar';
import type {FavoriteUser} from '@store/slices/favorites/types';
import {IconName} from '@components/Icon/icons';
import {useLanguage} from '@hooks/useLanguage';
import type {IUserResponse} from '@services/usersService/types';
import {
  AvatarContainer,
  Bio,
  BoxesContainer,
  DataListContainer,
  DataListItem,
  FavoriteContainer,
  InfoBox,
  InfoBoxTitle,
  InfoBoxValue,
  InfoContainer,
  InfoListText,
  Login,
  NameContainer,
  UserName,
} from './styled';

export interface UserDetailsProps {
  user: IUserResponse;
  isFavorite?: boolean;
  onFavoritePress?: (user: FavoriteUser) => void;
}

const UserDetails: FC<UserDetailsProps> = ({user, isFavorite, onFavoritePress}) => {
  const {t} = useLanguage();
  const theme = useTheme();

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
    <InfoContainer>
      <AvatarContainer>
        <UserAvatar size={10} avatar_url={user.avatar_url} />
        <FavoriteContainer>
          <FavoriteButton
            iconSize={20}
            isFavorite={isFavorite}
            onPress={() => {
              onFavoritePress?.({
                id: user.id,
                login: user.login,
                avatar_url: user.avatar_url,
              });
            }}
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
  );
};

export default UserDetails;
