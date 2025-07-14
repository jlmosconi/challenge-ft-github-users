import {IconName} from './icons';

export interface IconProps {
  name: IconName;
  color?: string;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: 'image' | 'button' | 'link';
}
