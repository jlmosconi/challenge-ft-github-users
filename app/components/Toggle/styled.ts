import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';
import type {ToggleWrapperProps} from './types';

export const Wrapper = styled.Pressable`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

export const IndicatorWrapper = styled.View<ToggleWrapperProps>`
  width: 40px;
  height: 24px;
  background-color: ${({theme, checked, disabled}) =>
    checked ? (disabled ? theme.colors.grey.dark : theme.colors.textPrimary) : theme.colors.grey.medium};
  border-radius: 16px;
  position: relative;
`;

export const Indicator = styled(Animated.View)`
  width: 18px;
  height: 18px;
  border-radius: 18px;
  background-color: ${({theme}) => theme.colors.grey.light};
  position: absolute;
  left: 3px;
  top: 3px;
`;
