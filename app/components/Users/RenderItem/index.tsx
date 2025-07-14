import {memo, type FC} from 'react';
import Animated, {FadeIn, LinearTransition} from 'react-native-reanimated';
import UserItem from '@components/Users/Item';
import {FavoriteUser} from '@store/slices/favorites/types';

interface RenderItemProps {
  user: FavoriteUser;
  isFavorite?: boolean;
  animate?: boolean;
  onPress?: () => void;
  onFavoritePress: (user: FavoriteUser) => void;
}

const UserRenderItem: FC<RenderItemProps> = ({user, isFavorite, animate = false, onPress, onFavoritePress}) => {
  const content = (
    <UserItem
      login={user.login}
      avatar_url={user.avatar_url}
      handleOnPress={() => onPress?.()}
      handleOnFavorite={() => onFavoritePress(user)}
      isFavorite={isFavorite}
    />
  );

  if (!animate) {
    return content;
  }

  return (
    <Animated.View
      layout={LinearTransition.springify().damping(40).mass(0.1).stiffness(150)}
      entering={FadeIn.duration(300).delay(200)}>
      {content}
    </Animated.View>
  );
};
export default memo(UserRenderItem, (prev, next) => {
  // Only re-render if the user or favorite status changes
  return prev.user.id === next.user.id && prev.isFavorite === next.isFavorite;
});
