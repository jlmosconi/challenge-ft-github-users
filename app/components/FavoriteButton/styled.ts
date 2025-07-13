import styled from 'styled-components/native';

export const IconButton = styled.Pressable`
  padding: ${({theme}) => `${theme.size(2)}px`};
  align-items: center;
  justify-content: center;
  border-radius: 50%;
`;
