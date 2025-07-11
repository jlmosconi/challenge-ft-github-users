import Icon from '..';
import styled from 'styled-components/native';
import type {SpecificSizeIconProps} from './types';

export const StyledIcon = styled(Icon)<SpecificSizeIconProps>`
  width: ${({size, theme}) => `${theme.size(size)}px`};
  height: ${({size, theme}) => `${theme.size(size)}px`};
`;
