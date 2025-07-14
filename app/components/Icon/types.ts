import {IconName} from './icons';

export interface IconProps {
  name: IconName;
  color?: string;
  accessibilityLabel?: string;
  accessibilityRole?: 'image' | 'button' | 'link';
}
