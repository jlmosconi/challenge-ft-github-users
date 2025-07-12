import {type FC} from 'react';
import Animated, {FadeOut, FadeIn, LinearTransition} from 'react-native-reanimated';
import UserItem from '@components/Users/Item';
import {FavoriteUser} from '@store/slices/favorites/types';

interface RenderItemProps {
  user: FavoriteUser;
  isFavorite: boolean;
  onFavoritePress: (user: FavoriteUser) => void;
  animate?: boolean;
  index?: number;
}

const UserRenderItem: FC<RenderItemProps> = ({user, isFavorite, onFavoritePress, animate = false, index = 0}) => {
  const itemContent = (
    <UserItem
      login={user.login}
      avatar_url={user.avatar_url}
      handleOnFavorite={() => onFavoritePress(user)}
      isFavorite={isFavorite}
    />
  );

  if (!animate) {
    return itemContent;
  }

  return (
    <Animated.View
      layout={LinearTransition.springify()}
      entering={FadeIn.duration(150 * (index + 1)).delay(200)}
      exiting={FadeOut.duration(150)}>
      {itemContent}
    </Animated.View>
  );
};

export default UserRenderItem;
