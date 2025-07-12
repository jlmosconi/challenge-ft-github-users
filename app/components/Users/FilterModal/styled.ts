import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';

export const Container = styled.View`
  gap: ${({theme}) => theme.size(theme.spacing(1))}px;
`;

export const FilterContainer = styled(TouchableOpacity)<{selected: boolean}>`
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({selected, theme}) => (selected ? theme.colors.grey.medium : 'transparent')};
  padding: ${({theme}) => theme.size(8)}px;
  border-radius: ${({theme}) => theme.size(theme.spacing(1))}px;
`;
