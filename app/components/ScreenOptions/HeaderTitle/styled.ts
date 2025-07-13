import {Weight} from '@components/Text/TypographyText';
import styled from 'styled-components/native';

export const HeaderTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({theme}) => `${theme.size(theme.spacing(1))}px`};
`;

export const Title = styled.Text<{color?: string}>`
  ${({theme}) => theme.typography.body1({weight: Weight.SEMI_BOLD})}
  color: ${({theme, color}) => color || theme.colors.textPrimary};
`;
