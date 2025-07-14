import {Pressable} from 'react-native';
import styled from 'styled-components/native';

export const FilterContainer = styled(Pressable)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme}) => theme.size(theme.spacing(1))}px;
  padding-horizontal: ${({theme}) => theme.size(theme.spacing(2))}px;
  padding-vertical: ${({theme}) => theme.size(theme.spacing(1))}px;
  border-radius: ${({theme}) => theme.size(8)}px;
  background-color: ${({theme}) => theme.colors.surface};
  align-self: flex-end;
`;
