import {memo, type FC} from 'react';
import Animated, {FadeOut, FadeIn, LinearTransition} from 'react-native-reanimated';
import UserItem from '@components/Users/Item';
import {FavoriteUser} from '@store/slices/favorites/types';

interface RenderItemProps {
  user: FavoriteUser;
  onFavoritePress: (user: FavoriteUser) => void;
  isFavorite?: boolean;
  animate?: boolean;
}

const UserRenderItem: FC<RenderItemProps> = ({user, isFavorite, onFavoritePress, animate = false}) => {
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
      layout={LinearTransition.springify().damping(40).mass(0.1).stiffness(150)}
      entering={FadeIn.duration(300).delay(200)}>
      {itemContent}
    </Animated.View>
  );
};
export default memo(UserRenderItem);
