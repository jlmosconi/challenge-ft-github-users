import {IconName} from '@components/Icon/icons';

export interface EmptyStateProps {
  iconName: IconName;
  iconSize?: number;
  text: string;
  spacing?: number;
  iconTestID?: string;
  textTestID?: string;
}
