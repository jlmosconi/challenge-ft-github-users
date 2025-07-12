import {Weight} from '@components/Text/TypographyText';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  background-color: ${({theme}) => theme.colors.surface};
  width: 100%;
  border-radius: ${({theme}) => `${theme.size(12)}px`};
  padding-vertical: ${({theme}) => `${theme.size(8)}px`};
  padding-horizontal: ${({theme}) => `${theme.size(12)}px`};
  gap: ${({theme}) => theme.size(4)}px;
  flex-direction: row;
  justify-content: space-between;
`;

export const StyledTextInput = styled.TextInput`
  background-color: transparent;
  flex: 1;
  padding-vertical: ${({theme}) => `${theme.size(4)}px`};
  padding-horizontal: ${({theme}) => `${theme.size(4)}px`};
  margin-right: ${({theme}) => `${theme.size(16)}px`};
  font-size: ${({theme}) => `${theme.size(16)}px`};
  ${({theme}) => theme.typography.body1({weight: Weight.REGULAR})};
`;

export const IconWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;
