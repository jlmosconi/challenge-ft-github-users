import type {FlatListProps} from 'react-native';

export interface InfiniteScrollListProp<T> extends FlatListProps<T> {
  isLoading?: boolean;
  fetchNextData?: () => void;
  refreshData?: () => void;
}
