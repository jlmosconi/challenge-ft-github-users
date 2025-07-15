import {type FC, useEffect, useRef} from 'react';
import {useTheme} from 'styled-components/native';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import {IconName} from '@components/Icon/icons';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import {IconButton} from './styled';
import {useLanguage} from '@hooks/useLanguage';

interface FavoriteButtonProps {
  isFavorite?: boolean;
  iconSize?: number;
  pressDelay?: number; // delay in milliseconds to prevent rapid toggling
  onPress?: () => void;
  accessibilityLabel?: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  isFavorite,
  iconSize = 24,
  pressDelay = 350,
  onPress,
  accessibilityLabel,
}) => {
  const theme = useTheme();
  const {t} = useLanguage();

  const scale = useSharedValue(1);
  const prevIsFavorite = useRef(isFavorite);
  const lastPress = useRef<number>(0);

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
  const iconColor = isFavorite ? theme.colors.yellow : theme.colors.grey.dark;

  const handlePress = () => {
    const now = Date.now();
    if (now - lastPress.current < pressDelay) return; // prevent rapid toggling
    lastPress.current = now;
    onPress?.();
  };

  return (
    <IconButton
      onPress={handlePress}
      testID="favoriteButton"
      accessibilityRole="button"
      accessibilityLabel={
        accessibilityLabel || (isFavorite ? t('favorites.accessibility.remove') : t('favorites.accessibility.add'))
      }
      accessibilityHint={isFavorite ? t('favorites.accessibility.hint.remove') : t('favorites.accessibility.hint.add')}
      accessibilityState={{selected: !!isFavorite}}>
      <Animated.View style={animatedStyle}>
        <SpecificSizeIcon size={iconSize} name={iconName} color={iconColor} />
      </Animated.View>
    </IconButton>
  );
};

export default FavoriteButton;
