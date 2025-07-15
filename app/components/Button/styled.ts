import {Weight} from '@components/Text/TypographyText';
import styled from 'styled-components/native';

export const StyledButton = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.surface};
  padding-vertical: ${({theme}) => theme.size(theme.spacing(1.5))}px;
  padding-horizontal: ${({theme}) => theme.size(theme.spacing(3))}px;
  border-radius: ${({theme}) => theme.size(theme.spacing(1))}px;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: ${({theme}) => theme.colors.textPrimary};
  ${({theme}) => theme.typography.button({weight: Weight.BOLD})};
`;
