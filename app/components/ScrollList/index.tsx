import {JSX, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList} from 'react-native';
import type {ScrollListProp} from './types';
import {Separator} from './styled';
import {lightTheme} from '@config/theme';

const SCROLL_EVENT_THROTTLE = 32;
const SCROLL_END_THRESHOLD = 0.25;
const DEFAULT_NUM_RENDER = 10;
const ITEM_HEIGHT = lightTheme.size(56);

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
      getItemLayout={(_, index) => ({
        // Provides a fixed height for each item
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
    />
  );
};
export default ScrollList;
