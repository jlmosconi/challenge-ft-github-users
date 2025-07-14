import styled from 'styled-components/native';
import SpecificSizeIcon from '@components/Icon/SpecificSize';
import SpacingBox from '@components/SpacingBox';
import {Weight} from '@components/Text/TypographyText';

export const Container = styled(SpacingBox)`
  align-items: center;
`;

export const Text = styled.Text`
  ${({theme}) => theme.typography.body1({weight: Weight.REGULAR})};
  color: ${({theme}) => theme.colors.grey.dark};
  text-align: center;
`;

export const EmptyIcon = styled(SpecificSizeIcon)`
  color: ${({theme}) => theme.colors.grey.dark};
  opacity: 0.9;
`;
