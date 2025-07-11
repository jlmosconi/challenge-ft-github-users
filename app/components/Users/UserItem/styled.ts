import {Pressable} from 'react-native';
import styled from 'styled-components/native';

export const Block = styled(Pressable)`
  flex-direction: row;
  width: 100%;
  background-color: ${({theme}) => theme.colors.surface};
  padding: ${({theme}) => `${theme.size(12)}px`};
  gap: ${({theme}) => `${theme.size(theme.spacing(1))}px`};
  border: none;
  border-width: 0;
  border-radius: ${({theme}) => `${theme.size(12)}px`};
`;

export const ColumnLeft = styled.View`
  align-self: center;
`;

export const ColumnCenter = styled.View`
  justify-content: center;
  flex: 1;
`;

export const ColumnRight = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
