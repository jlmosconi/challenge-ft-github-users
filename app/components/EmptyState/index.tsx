import {type FC} from 'react';
import SpacingBox from '@components/SpacingBox';
import type {EmptyStateProps} from './types';
import {Container, EmptyIcon, Text} from './styled';

const EmptyState: FC<EmptyStateProps> = ({text, spacing = 10, iconName, iconSize = 100, iconTestID, textTestID}) => {
  return (
    <Container mt={spacing}>
      <SpacingBox testID={iconTestID} mb={1}>
        <EmptyIcon size={iconSize} name={iconName} />
      </SpacingBox>
      <Text testID={textTestID}>{text}</Text>
    </Container>
  );
};
export default EmptyState;
