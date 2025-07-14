import styled from 'styled-components/native';
import {LIST_SEPARATOR_HEIGHT} from '.';

export const Separator = styled.View`
  height: ${({theme}) => theme.size(LIST_SEPARATOR_HEIGHT)}px;
`;
