import type {TouchableOpacityProps} from 'react-native';
import {IconName} from '@components/Icon/icons';

export interface HeaderButtonProps extends TouchableOpacityProps {
  iconName: IconName;
  iconSize?: number;
  color?: string;
  spacingRight?: number;
  spacingLeft?: number;
  testID?: string;
  accessibilityLabel?: string;
}
