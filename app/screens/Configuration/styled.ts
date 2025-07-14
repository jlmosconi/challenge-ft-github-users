import {Pressable} from 'react-native';
import SpacingBox from '@components/SpacingBox';
import {Weight} from '@components/Text/TypographyText';
import styled from 'styled-components/native';

export const ListContainer = styled(SpacingBox)`
  gap: ${({theme}) => theme.size(theme.spacing(1))}px;
`;

export const ListItem = styled(Pressable)`
  flex-direction: row;
  align-items: center;

  background-color: ${({theme}) => theme.colors.surface};
  padding-vertical: ${({theme}) => theme.size(theme.spacing(1.5))}px;
  padding-horizontal: ${({theme}) => theme.size(theme.spacing(1))}px;
  gap: ${({theme}) => theme.size(theme.spacing(1))}px;
  border-radius: ${({theme}) => theme.size(theme.spacing(1))}px;
  width: 100%;
`;

export const ItemTitle = styled.Text`
  ${({theme}) => theme.typography.caption({weight: Weight.SEMI_BOLD})};
  color: ${({theme}) => theme.colors.textPrimary};
  flex: 1;
`;
