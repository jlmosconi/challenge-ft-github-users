import {JSX, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import type {InfiniteScrollListProp} from './types';
import {Separator} from './styled';

const SCROLL_EVENT_THROTTLE = 32;
const SCROLL_END_THRESHOLD = 0.25;
const DEFAULT_NUM_RENDER = 10;

const InfiniteScrollList = <T,>({
  fetchNextData,
  refreshData,
  ItemSeparatorComponent = Separator,
  testID = 'infiniteScrollList',
  contentContainerStyle,
  initialNumToRender = DEFAULT_NUM_RENDER,
  isLoading,
  ...props
}: InfiniteScrollListProp<T>): JSX.Element => {
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
      scrollEnabled={(initialNumToRender || 0) >= DEFAULT_NUM_RENDER}
      maxToRenderPerBatch={initialNumToRender}
      showsVerticalScrollIndicator={false}
      testID={testID}
      scrollEventThrottle={SCROLL_EVENT_THROTTLE}
      onEndReachedThreshold={SCROLL_END_THRESHOLD}
      refreshing={refreshing}
      onRefresh={handleRefresh}
      onEndReached={() => {
        if (!callOnScrollEnd.current && !isLoading && !refreshing) return;
        handleOnEndReached();
      }}
      onMomentumScrollBegin={() => (callOnScrollEnd.current = true)}
      onMomentumScrollEnd={() => {
        callOnScrollEnd.current = false;
      }}
      ItemSeparatorComponent={ItemSeparatorComponent}
      contentContainerStyle={{
        ...(typeof contentContainerStyle === 'object' ? contentContainerStyle : {}),
      }}
    />
  );
};
export default InfiniteScrollList;
