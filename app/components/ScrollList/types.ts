import type {FlatListProps} from 'react-native';

export interface ScrollListProp<T> extends FlatListProps<T> {
  isLoading?: boolean;
  fetchNextData?: () => void;
  refreshData?: () => void;
}
