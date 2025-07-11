import SpacingBox from '@components/SpacingBox';
import styled from 'styled-components/native';

export const Container = styled(SpacingBox)`
  width: 100%;
  border-radius: ${({theme}) => `${theme.size(12)}px`};
  gap: ${({theme}) => theme.size(theme.spacing(1))};
`;
