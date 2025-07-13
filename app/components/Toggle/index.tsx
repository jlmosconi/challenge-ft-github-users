import {type FC, useCallback, useEffect, useRef} from 'react';
import {Animated} from 'react-native';
import {IndicatorWrapper, Label, Wrapper, Indicator} from './styled';
import type {ToggleProps} from './types';

const Toggle: FC<ToggleProps> = ({disabled, checked, onPress, label, testID}) => {
  const translation = useRef(new Animated.Value(checked ? 16 : 0)).current;

  useEffect(() => {
    Animated.spring(translation, {
      toValue: checked ? 16 : 0,
      useNativeDriver: true,
    }).start();
  }, [checked, translation]);

  const onPressWrapper = useCallback(() => {
    !disabled && onPress?.();
  }, [disabled, onPress]);

  return (
    <Wrapper
      onPress={onPress ? onPressWrapper : undefined}
      disabled={onPress ? disabled : true}
      accessible
      accessibilityLabel={label}
      accessibilityRole="checkbox"
      accessibilityState={{disabled, checked}}>
      <IndicatorWrapper disabled={disabled} checked={checked}>
        <Indicator testID={`${testID}`} style={{transform: [{translateX: translation}]}} />
      </IndicatorWrapper>
      {label && <Label disabled={disabled}>{label}</Label>}
    </Wrapper>
  );
};

export default Toggle;
