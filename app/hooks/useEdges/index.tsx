import {useHeaderHeight} from '@react-navigation/elements';
import {Edge} from '@config/constants/edges';

export const useEdges = (
  disableVertical?: boolean,
  disableHorizontal?: boolean,
  disableBottom?: boolean,
  disableTop?: boolean,
) => {
  try {
    const height = useHeaderHeight();
    if (disableVertical) return [Edge.Left, Edge.Right];
    if (disableHorizontal) return [Edge.Top, Edge.Bottom];
    if (disableBottom) return [Edge.Top, Edge.Left, Edge.Right];
    if (disableTop) return [Edge.Bottom, Edge.Left, Edge.Right];
    return height === 0 ? [Edge.Top, Edge.Left, Edge.Right, Edge.Bottom] : [Edge.Left, Edge.Right, Edge.Bottom];
  } catch (e) {
    return [Edge.Top, Edge.Left, Edge.Right, Edge.Bottom];
  }
};
