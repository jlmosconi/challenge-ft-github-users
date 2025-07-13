import styled from 'styled-components/native';

export const InfoContainer = styled.View`
  text-align: center;
  justify-content: center;
  align-items: center;
  gap: ${({theme}) => theme.size(theme.spacing(1))}px;
`;
