import type {PropsWithChildren, FC} from 'react';
import {useHeaderHeight} from '@react-navigation/elements';
import {useTheme} from 'styled-components/native';
import {Edge} from '@config/constants/edges';
import type {SafeAreaProps} from './types';
import {Container, Wrapper} from './styled';

const useEdges = (
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

const SafeArea: FC<PropsWithChildren<SafeAreaProps>> = ({
  color,
  children,
  padding = 16,
  disableVertical,
  disableHorizontal,
  disableBottom,
  disableTop,
}) => {
  const theme = useTheme();
  const edges = useEdges(disableVertical, disableHorizontal, disableBottom, disableTop);

  return (
    <Wrapper color={color || theme.colors.background} edges={edges}>
      <Container padding={padding}>{children}</Container>
    </Wrapper>
  );
};

export default SafeArea;
