import {type FC, useEffect, useRef} from 'react';
import {useTheme} from 'styled-components/native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {IconName} from '@components/Icon/icons';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconButton} from './styled';

interface FavoriteButtonProps {
  isFavorite?: boolean;
  onPress?: () => void;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({isFavorite, onPress}) => {
  const theme = useTheme();

  const scale = useSharedValue(1);
  const prevIsFavorite = useRef(isFavorite);

  useEffect(() => {
    if (!prevIsFavorite.current && isFavorite) {
      // only animate if it changed from false to true
      scale.value = withSpring(1.25, {damping: 5, stiffness: 200}, () => {
        scale.value = withSpring(1);
      });
    }
    prevIsFavorite.current = isFavorite;
  }, [isFavorite, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  const iconName = isFavorite ? IconName.StarFilled : IconName.StarEmpty;
  const iconColor = isFavorite ? theme.colors.primary : theme.colors.grey.dark;

  return (
    <IconButton onPress={onPress} testID="favoriteButton">
      <Animated.View style={animatedStyle}>
        <SpecificSizeIcon size={24} name={iconName} color={iconColor} />
      </Animated.View>
    </IconButton>
  );
};

export default FavoriteButton;
