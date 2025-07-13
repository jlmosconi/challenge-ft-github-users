import {JSX, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import type {ScrollListProp} from './types';
import {Separator} from './styled';

const SCROLL_EVENT_THROTTLE = 32; // Throttle for scroll events. 32ms
const SCROLL_END_THRESHOLD = 0.25; // 25% of the list height
const DEFAULT_NUM_RENDER = 10; // Default number of items to render initially

const ScrollList = <T,>({
  fetchNextData,
  refreshData,
  ItemSeparatorComponent = Separator,
  testID = 'ScrollList',
  initialNumToRender = DEFAULT_NUM_RENDER,
  isLoading,
  ...props
}: ScrollListProp<T>): JSX.Element => {
  const [refreshing, setRefreshing] = useState(false);
  const callOnScrollEnd = useRef(false);

  const handleRefresh = useCallback(() => {
    if (refreshData) {
      setRefreshing(true);
      refreshData();
    }
  }, [refreshData]);

  const handleOnEndReached = useCallback(() => {
    callOnScrollEnd.current = true;
    fetchNextData?.();
  }, [fetchNextData]);

  useEffect(() => {
    if (!isLoading && refreshing) {
      setRefreshing(false);
    }
  }, [isLoading, refreshing]);

  return (
    <FlatList
      {...props}
      testID={testID}
      maxToRenderPerBatch={initialNumToRender}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={SCROLL_EVENT_THROTTLE}
      onEndReachedThreshold={SCROLL_END_THRESHOLD}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReached={() => {
        if (!callOnScrollEnd.current && !isLoading && !refreshing) return;
        handleOnEndReached();
      }}
      onMomentumScrollBegin={() => (callOnScrollEnd.current = true)} // Set the flag to true when scrolling starts
      onMomentumScrollEnd={() => {
        callOnScrollEnd.current = false;
      }} // Reset the flag after scroll ends
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};
export default ScrollList;
