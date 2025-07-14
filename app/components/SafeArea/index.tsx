import type {PropsWithChildren, FC} from 'react';
import {useTheme} from 'styled-components/native';
import {useEdges} from '@hooks/useEdges';
import type {SafeAreaProps} from './types';
import {Container, Wrapper} from './styled';
/**
 * SafeArea component that provides a safe area with customizable padding and background color.
 * It uses the edges to determine which sides to apply padding based on the provided props.
 */
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
