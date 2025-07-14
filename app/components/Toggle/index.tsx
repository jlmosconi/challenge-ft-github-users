import {type FC, useCallback, useEffect} from 'react';
import Animated, {useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';
import type {ToggleProps} from './types';
import {IndicatorWrapper, Wrapper, Indicator} from './styled';

const TOGGLE_TRANSLATION_X = 16;

const Toggle: FC<ToggleProps> = ({disabled, checked, onPress, accessibilityLabel, testID}) => {
  const translation = useSharedValue(checked ? TOGGLE_TRANSLATION_X : 0);

  useEffect(() => {
    translation.value = withSpring(checked ? TOGGLE_TRANSLATION_X : 0, {
      damping: 15,
      stiffness: 150,
    });
  }, [checked, translation]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translation.value}],
  }));

  const onPressWrapper = useCallback(() => {
    if (!disabled) {
      onPress?.();
    }
  }, [disabled, onPress]);

  return (
    <Wrapper
      onPress={onPress ? onPressWrapper : undefined}
      disabled={onPress ? disabled : true}
      accessible
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="checkbox"
      accessibilityState={{disabled, checked}}>
      <IndicatorWrapper disabled={disabled} checked={checked}>
        <Animated.View testID={testID} style={animatedStyle}>
          <Indicator />
        </Animated.View>
      </IndicatorWrapper>
    </Wrapper>
  );
};

export default Toggle;
